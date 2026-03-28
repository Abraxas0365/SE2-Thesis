import { createContext, useContext, useRef } from "react";

const CameraContext = createContext();

export const useCamera = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
  const streamsRef = useRef({});

  const startCamera = async (roomId, deviceId) => {
    if (streamsRef.current[roomId]) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
    });

    streamsRef.current[roomId] = stream;
  };

  const getStream = (roomId) => {
    return streamsRef.current[roomId];
  };

  return (
    <CameraContext.Provider value={{ startCamera, getStream }}>
      {children}
    </CameraContext.Provider>
  );
};