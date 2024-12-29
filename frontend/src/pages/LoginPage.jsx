import { Box, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../app/features/auth/authSlice";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      console.log(res);
      navigate("/");
      localStorage.setItem("token", res.token);
    } catch (err) {
      console.log(err);
      setError("root", {
        type: "manual",
        message: err || "an error occurred",
      });
      setTimeout(() => {
        clearErrors("root");
      }, 5000);
    }
  };

  return (
    <div className=" h-screen py-4  flex justify-center items-center">
      <div className="sm:w-1/2 md:w-[40%] lg:w-[23%] w-[90%] ">
        <h1 className="text-2xl font-normal py-4">Login Here</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              {...register("email", {
                required: { value: true, message: "email is required" },
              })}
              className="p-2 rounded-sm mb-2 bg-[#eeeeee]"
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "password is required" },
              })}
              className="p-2 rounded-sm mb-2 bg-[#eeeeee]"
              id="password"
              placeholder="password"
            />
          </div>
          <div className="w-full ">
            {errors.root && (
              <p className=" w-full pb-2 text-red-600">{errors.root.message}</p>
            )}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-green-200 w-full py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-8">
          <p>
            {" "}
            Don't have account ?{" "}
            <Link to={"/signup"}>
              {" "}
              <span className="font-medium">Signup Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
