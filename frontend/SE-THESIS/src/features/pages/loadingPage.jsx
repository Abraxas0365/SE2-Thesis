import React, { useState, useEffect } from "react";
import { useServerStatus } from "../../context/serverStatusContext";
import { checkServerHealth } from "../../shared/services/healthService";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/images/slanted_logo.png";
import Logo2 from "@/assets/images/slanted_logo2.png";

// !Moved the check health function here
// !Also heres where the wrapper status gets updated. So basically,
// !when the server is down or not yet started, all pages will redirect
// !here when they try to send a request to the backend. So when you enter
// !here

// !So right now server health is still kinda wonky.
// TODO: Proper state update and page reloads when server went down
// *DONE: Made a handler for this.

export default function LoadingPage() {
  const navigate = useNavigate();
  const { setIsServerUp } = useServerStatus();

  
  useEffect(() => {
    const checkServer = async () => {
      setIsServerUp(false)
      const healthy = await checkServerHealth();

      if (healthy) {
        setIsServerUp(true);
        navigate("/iris/");
      }
    };

    const interval = setInterval(checkServer, 3000);
    checkServer();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen font-montserrat bg-[#E4E3E1] p-10 flex items-end justify-center overflow-hidden">
      <div className="absolute left-[7vw] bottom-[5vw] flex flex-row gap-4 items-center">
        <span class="loader"></span>
        <h1 className="font-montserrat font-bold text-[#858585] text-title">
          Intelligent Room Interaction System
        </h1>
      </div>
      <div className="relative w-3/4 h-screen group left-[22vw]">
        <img
          src={Logo}
          alt="Logo"
          className="w-full absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={Logo2}
          alt="Logo2"
          className="w-full absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
