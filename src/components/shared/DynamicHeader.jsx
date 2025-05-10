import { useLocation, useNavigate } from "react-router-dom";

const DynamicHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  let title = "Dashboard";
  let onLogout = () => {};

  if (location.pathname.includes("job-seeker")) {
    title = "JobSeeker Dashboard";
    onLogout = () => {
      localStorage.clear();
      navigate("/job-seeker");
    };
  } else if (location.pathname.includes("company")) {
    title = "Company Dashboard";
    onLogout = () => {
      sessionStorage.clear();
      navigate("/company");
    };
  }

  return (
    <header
      className="px-4 py-3 d-flex justify-content-between align-items-center border-bottom"
      style={{
        background: "linear-gradient(135deg , rgb(32, 58, 67), rgb(44, 83, 100),rgb(15, 32, 39))",
        color: "white",
        height: "64px",
        flexShrink: 0,
      }}
    >
      <h5 className="m-0">{title}</h5>
      <button className="btn btn-outline-danger" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};

export default DynamicHeader;
