import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./layouts/root/root";
import Home from "./pages/home/home.jsx";
import JobSeekerDashboard from "./pages/job-seeker/job-seeker.jsx"; // ✅ تعديل الاسم هنا
import CompanyDashboard from "./pages/company/company.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "job-seeker", element: <JobSeekerDashboard /> }, // ✅ تعديل الاسم هنا
      { path: "company", element: <CompanyDashboard /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
