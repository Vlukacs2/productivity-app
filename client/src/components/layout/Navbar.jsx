import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Productivity App
          </h1>

          <p className="text-sm text-slate-500">
            Welcome, {user?.name}
          </p>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
