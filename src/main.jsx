import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./layouts/root/root";
import Home from "./pages/home/home.jsx";
import JobSeekerDashboard from "./pages/job-seeker/job-seeker.jsx";
import CompanyDashboard from "./pages/company/company.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute"; // ✅ حماية المسارات

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "job-seeker",
        element: (
          <ProtectedRoute allowedRole="jobSeeker">
            <JobSeekerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "company",
        element: (
          <ProtectedRoute allowedRole="company">
            <CompanyDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
