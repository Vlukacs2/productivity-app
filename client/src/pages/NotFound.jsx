import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
      <h1 className="mb-4 text-6xl font-extrabold text-slate-900">
        404
      </h1>

      <p className="mb-6 text-lg text-slate-600">
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
