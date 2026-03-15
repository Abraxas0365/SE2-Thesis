
export const logoutUser = (navigate) => {
  localStorage.removeItem("token");
  navigate("/iris/login");
};