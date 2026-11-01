import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center pt-24">
      <div className="container-x text-center">
        <p className="font-display text-[9rem] font-bold leading-none text-gradient sm:text-[12rem]">404</p>
        <h1 className="heading-md mt-2">Page not found</h1>
        <p className="lead mx-auto mt-3 max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
