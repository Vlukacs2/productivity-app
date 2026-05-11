import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-slate-900 md:text-6xl">
          Organize your work with Productivity App
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-slate-600">
          A simple fullstack productivity manager where you can create,
          update, filter and complete your daily tasks.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/register">
            <Button>Get started</Button>
          </Link>

          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
