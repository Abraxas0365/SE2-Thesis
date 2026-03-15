// !Aight so instead of doing this if function in every server request, i made
// !this handler instead. So what this does is basically set the global server
// !status to false then put us back to loading page where the server checking
// !process retries again.

export const handleServerDown = (error, setIsServerUp, navigate) => {

  if (error?.type === "server_down") {
    setIsServerUp(false);
    console.warn(error.message);
    navigate("/");
    return true;
  }

  return false;
};