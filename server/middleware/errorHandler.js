// Postgres error codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
const PG = {
  UNIQUE: '23505',
  FOREIGN_KEY: '23503',
  CHECK: '23514',
  INVALID_TEXT: '22P02'
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // Drizzle wraps driver errors; the Postgres error is in `cause`
  const pgError = err.cause?.code ? err.cause : err;
  console.error('Error:', err.name, pgError.message);

  switch (pgError.code) {
    case PG.UNIQUE:
      return res.status(409).json({
        status: 'error',
        message: /email/.test(pgError.constraint || pgError.detail || '') ? 'Email is already registered' : 'This record already exists'
      });
    case PG.FOREIGN_KEY:
      return res.status(400).json({ status: 'error', message: 'A related record does not exist' });
    case PG.CHECK:
      return res.status(400).json({ status: 'error', message: 'Some values are out of the allowed range' });
    case PG.INVALID_TEXT:
      return res.status(400).json({ status: 'error', message: 'Invalid identifier' });
  }

  // Malformed JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', message: 'Malformed JSON in request body' });
  }

  // Database unreachable
  if (['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', '57P01', '53300'].includes(pgError.code) || /DATABASE_URL|connect/i.test(err.message)) {
    return res.status(503).json({ status: 'error', message: 'Database is unavailable. Please try again in a few moments.' });
  }

  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
};
