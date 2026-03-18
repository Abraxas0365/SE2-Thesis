// !Libraris
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// !Components Imports
import { handleServerDown } from "../../shared/utils/serverDownHandler.js";
import { registerUser } from "../../shared/services/authService";
import { useServerStatus } from "../../context/serverStatusContext.jsx";
import { Toaster } from "../../shared/components/ui/sonner.js";
import SlideUp from "../../shared/components/animations/slideUp.jsx";
// !Assets
import Logo from "@/assets/icons/logo.png";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";

//*  Okay so huge update dito sa Signup page. I converted the validation form to react-hook-form. So all validations are done in that process
//* instead of manually declaring function for each field. Also shortends the code by at least 30%.

//TODO: Update the UI design
//TODO: Add toasters for notification
//TODO: Proper page routing

export default function SignUpPage() {
  const { isServerUp, setIsServerUp } = useServerStatus();
  const [registerError, setRegisterError] = useState("");

  // ?These are the function of react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // ?Watches everything for validation
  const username = watch("username");
  const email = watch("email");
  const password = watch("password");
  const passwordValue = watch("password", "");

  const isDisabled = !username || !email || !password || !passwordValue;

  const onError = (errors) => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
    if (errors.confirmPassword) {
      toast.error(errors.confirmPassword.message);
    }
  };

  // ?Well, self explanatory. Sends the formdata to the auth service to express backend
  const onSubmit = async (data) => {
    try {
      const res = await registerUser({
        first_name: data.username,
        last_name: "User",
        email: data.email,
        password: data.password,
      });

      toast.success(res.message);
      setRegisterError("");
      navigate("/iris/login");
    } catch (error) {
      if (handleServerDown(error, setIsServerUp, navigate)) return;
      const message = error.response?.data?.message || "Registration failed";
      setRegisterError(message);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen font-montserrat flex-col gap-9 bg-[#E4E3E1] p-10 flex items-center justify-center overflow-hidden">
      <SlideUp duration={0.7}>
        {/* SIGN UP SECTION */}
        <section className="mb-[5%] w-[40%] h-fit bg-[#DFDEDA] flex flex-col p-12 gap-9 items-center rounded-4xl shadow-outside-dropshadow">
          <h1 className="primary-text font-bold">Sign Up</h1>
          {registerError && (
            <div className="w-[90%] py-5 px-5 border border-[#A1A2A6] primary-text rounded-3xl flex flex-row items-center justify-center gap-2 mt-4">
              <CircleAlert size={30} className="text-red-400" />
              <p>{registerError}</p>
            </div>
          )}
          <form
            // ?Wraps submit to onSubmit function ng react-hook-form, then automatically runs all the validation rules
            onSubmit={handleSubmit(onSubmit, onError)}
            className=" w-full flex flex-col items-center gap-5"
          >
            {/* // ?Uses the register field ng react-hook-form. Then a parameter required is added with the error message */}
            <input
              {...register("username", { required: "Username is required" })}
              className="w-[90%] bg-[#E4E3E1] primary-text rounded-3xl px-6 py-4 shadow-inside-dropshadow-small font-light text-subtitle"
              placeholder="Username"
            />
            {/* // ?Now all these input fields follow the same patter with some having extra parameters */}

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="w-[90%] bg-[#E4E3E1] primary-text rounded-3xl px-6 py-4 shadow-inside-dropshadow-small font-light text-subtitle"
              type="email"
              placeholder="Email"
            />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-[90%] bg-[#E4E3E1] primary-text rounded-3xl px-6 py-4 shadow-inside-dropshadow-small font-light text-subtitle"
              type="password"
              placeholder="Password"
            />
            <input
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (val) =>
                  val === passwordValue || "Passwords do not match",
              })}
              className="w-[90%] bg-[#E4E3E1] primary-text rounded-3xl px-6 py-4 shadow-inside-dropshadow-small font-light text-subtitle"
              type="password"
              placeholder="Confirm Password"
            />
            {/* // ?This uses the formState na isSubmitting then base on that state, updates the button itself */}
            <button
              type="submit"
              disabled={isDisabled || isSubmitting}
              className={`w-[90%] bg-[#A1A2A6] text-subtitle text-[#E4E3E1] shadow-outside-dropshadow py-4 rounded-3xl ${isDisabled ? "opacity-70 transition-opacity duration-300 cursor-not-allowed" : "cursor-pointer hover:bg-[#8A8B8E] transition-all duration-300"}`}
            >
              {isSubmitting ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <button
            onClick={() => navigate("/iris/login")}
            className="primary-text hover:text-[#a9a9a9] cursor-pointer"
          >
            Already Have an Account?
          </button>
        </section>
      </SlideUp>

      <SlideUp>
        <section className="absolute bottom-[2vw] flex flex-col items-center gap-2">
          <img src={Logo} alt="Logo" />
          <p className="primary-text text-subtitle font-bold">
            Intelligent Room interaction System
          </p>
        </section>
      </SlideUp>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
