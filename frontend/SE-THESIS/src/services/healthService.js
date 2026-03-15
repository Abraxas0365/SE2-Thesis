import axiosClient from "../api/axiosClient.api";

export const checkServerHealth = async () => {
  try {
    const [serverRes, backendRes] = await Promise.all([
      axiosClient.get("/health"),
      axiosClient.get("/server/home/health")
    ]);
    return serverRes.status === 200 && backendRes.status === 200;
  } catch (error) {
    return false;
  }
};