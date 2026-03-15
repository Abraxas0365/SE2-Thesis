import { createContext, useContext, useState } from "react";

const ServerStatusContext = createContext();

// !So in here we make a server check wrapper so that we have more control
// !on ow we send health request to the server, and how we access the status
// !across the app.

export const ServerStatusProvider = ({ children }) => {
  const [isServerUp, setIsServerUp] = useState(false);

  return (

    // ?This is the wrapper provider making every page access the server status
    
    <ServerStatusContext.Provider value={{ isServerUp, setIsServerUp }}>
      {children}
    </ServerStatusContext.Provider>
  );
};

export const useServerStatus = () => useContext(ServerStatusContext);