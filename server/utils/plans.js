// Source of truth for membership pricing; the client only sends the plan name.
export const PLANS = {
  'Drop-In': { price: 3000, months: 3 },
  Unlimited: { price: 5000, months: 6 },
  Premium: { price: 10000, months: 12 }
};

export const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};
