import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingPage from "../components/pages/loadingPage";
import HomePage from "../pages/homepage";
import SignUpPage from "../auth/signUpPage";
import LoginPage from "../auth/loginPage";
import DashboardPage from "../pages/dashboardPage";
import ActivityPage from "../pages/activityPage";
import AnalyticsPage from "../pages/analyticsPage";
import NotificationPage from "../pages/notificationPage";
import Layout from "../components/layouts/layout";
import DevelopmentPage from "../components/pages/developmentPage";

import PageTransitions from "../components/animations/pageTransitions";

export default function AppRoutes() {;

  // TODO: Add comments for debugging
  // TODO: Fix check health to only send once
  // !Done! Made a wrapper for this.
  // TODO: Maybe move the check health to service component ¯\_(ツ)_/¯
  // !Also Done! Move it in services folder as healthService.js (　´∀｀)b

  return (
    <Routes element={<PageTransitions />}>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/iris" element={<HomePage />} />
      <Route path="/iris/login" element={<LoginPage />} />
      <Route path="/iris/signup" element={<SignUpPage />} />

      <Route path="iris" element={<Layout />}>
        <Route path="/iris/home" element={<DashboardPage />} />
        <Route path="/iris/activity" element={<ActivityPage />} />
        <Route path="/iris/development" element={<DevelopmentPage />} />
        <Route path="/iris/analytics" element={<AnalyticsPage />} />
        <Route path="/iris/notifications" element={<NotificationPage />} />
      </Route>
    </Routes>
  );
}
