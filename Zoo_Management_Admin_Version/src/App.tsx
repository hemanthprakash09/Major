
import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("adminAuth") === "true"
  );

  return isAdmin ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAdmin(true)} />;
}

export default App;
