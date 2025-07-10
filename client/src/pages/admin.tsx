import { useEffect } from "react";
import { useLocation } from "wouter";
import AdminDashboard from "@/components/admin-dashboard";

export default function Admin() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const adminPassword = localStorage.getItem("adminPassword");
    if (!adminPassword || adminPassword !== "2509-1991") {
      navigate("/");
    }
  }, [navigate]);

  const handleClose = () => {
    localStorage.removeItem("adminPassword");
    navigate("/");
  };

  return <AdminDashboard onClose={handleClose} />;
}
