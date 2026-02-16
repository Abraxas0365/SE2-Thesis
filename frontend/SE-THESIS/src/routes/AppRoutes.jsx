import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoadingPage from "../components/pages/loadingPage.jsx";
import HomePage from "../pages/homepage.jsx";
import SignUpPage from "../auth/signUpPage.jsx";
import LoginPage from "../auth/loginPage.jsx";

import PageTransitions from "../components/common/pageTransitions.jsx";

export default function AppRoutes() {
  const [serverStatus, setServerStatus] = useState("offline");
  const [backendStatus, setBackendStatus] = useState("offline");
  const navigate = useNavigate();

  const hasChecked = useRef(false);
  const SERVER_HEALTH = import.meta.env.SERVER_HEALTH
  const BACKEND_HEALTH = import.meta.env.BACKEND_HEALTH;

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const [serverRes, backendRes] = await Promise.all([
          fetch(SERVER_HEALTH),
          fetch(BACKEND_HEALTH),
        ]);

        if (serverRes.ok && backendRes.ok) {
          setServerStatus("Online");
          setBackendStatus("Online");
          navigate("/home"); 
        } else {
          setServerStatus("Offline");
          setBackendStatus("Offline");
          navigate("/");
        }
      } catch (error) {
        setServerStatus("Offline");
        setBackendStatus("Offline");
      }
    };

    if (!hasChecked.current) {
      checkServerStatus();
      hasChecked.current = true; // mark as done
    }
  }, [navigate]);

  return (
    <PageTransitions>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </PageTransitions>
  );
}
