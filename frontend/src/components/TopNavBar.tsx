import React from "react";
import { useLocation, Link } from "react-router-dom";

const TopNavbar: React.FC = () => {
  const location = useLocation();

  const pathToTitle: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/reports": "Reports & Analytics",
    "/manageflight": "Manage Flights",
    "/managebooking": "Manage Booking",
    "/managebooking/bookingoverview": "Booking Overview",
    "/manageflight/flightoverview": "Flight Overview",
    "/manageuser": "User Management",
  };

  const dashboardPaths = ["/dashboard", "/reports"];
  const isDashboard = dashboardPaths.includes(location.pathname);
  const prefix = isDashboard ? "Dashboard" : "Page";

  // สร้าง breadcrumb แบบลำดับ path
  const generateBreadcrumbs = (): { path: string; label: string }[] => {
    const segments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: { path: string; label: string }[] = [];
    let currentPath = "";

    for (const segment of segments) {
      currentPath += `/${segment}`;
      if (pathToTitle[currentPath]) {
        breadcrumbs.push({
          path: currentPath,
          label: pathToTitle[currentPath],
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="w-full h-[60px] px-6 flex items-center bg-white border-b border-[#D4D4D4]">
      <div className="flex text-[14px] font-light text-[#939393]">
        {prefix} /
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center ml-1">
            {index > 0 && <span className="mx-1">/</span>}
            <span className="text-black">{crumb.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNavbar;
