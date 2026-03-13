import axiosClient from "../api/axiosClient.api";

export const registerUser = async (userData) => {
  const response = await axiosClient.post("/auth/register", userData);
  console.log(response.data);
  return response.data;
};