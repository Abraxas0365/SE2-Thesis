import React from "react";
import Logo from "../../public/icons/logo.png";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen font-montserrat flex-col gap-9 bg-[#E4E3E1] p-10 flex items-center justify-center overflow-hidden">
      <section className="w-[40%] h-fit bg-[#DFDEDA] flex flex-col p-12 gap-9 items-center rounded-4xl shadow-outside-dropshadow">
        <h1 className="text-[#1e1e1e] opacity-50 font-bold">Login to your account</h1>
        <form
          action="submit"
          className=" w-full flex flex-col items-center gap-5"
        >
          <input
            className="w-[90%] bg-[#E4E3E1] text-[#1e1e1e] rounded-3xl px-6 py-4 shadow-inside-dropshadow-small font-light text-subtitle"
            type="text"
            name=""
            id=""
            placeholder="Email Address"
          />
          <input
            className="w-[90%] bg-[#E4E3E1] text-[#1e1e1e] rounded-3xl px-6 py-4 shadow-inside-dropshadow-small font-light text-subtitle"
            type="text"
            name=""
            id=""
            placeholder="Password"
          />
        </form>
        <button className="w-[90%] bg-[#A1A2A6] text-subtitle text-[#E4E3E1] shadow-outside-dropshadow py-4 rounded-3xl cursor-pointer hover:bg-[#8A8B8E] transition-colors duration-300">
          Login
        </button>
        <button className="text-[#505153] hover:text-[#3b3b3b] cursor-pointer">
          Don't Have an Account?
        </button>
      </section>

      <section className="absolute bottom-[2vw] flex flex-col items-center gap-2">
        <img src={Logo} alt="Logo" />
        <p className="text-[#1e1e1e] opacity-75 text-subtitle font-bold">
          Intelligent Room interaction System
        </p>
      </section>
    </div>
  );
}
