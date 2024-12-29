import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../app/features/auth/authSlice";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(signUp(data)).unwrap();
      console.log(res);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err || "an error occurred",
      });
      setTimeout(() => {
        clearErrors("root");
      }, 5000);
      console.log(err);
    }
  };
  return (
    <div className=" h-screen py-4  flex justify-center items-center">
      <div className="sm:w-1/2 md:w-[40%] lg:w-[23%] w-[90%] ">
        <h1 className="text-2xl font-normal py-4">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="email">FirstName</label>
              <input
                type="text"
                {...register("fullName.firstName", {
                  required: { value: true, message: "firstName is required" },
                })}
                className="p-2 rounded-sm mb-2 bg-[#eeeeee]"
                id="firstName"
                placeholder="FirstName"
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="lastName">LastName</label>
              <input
                type="text"
                {...register("fullName.lastName", {
                  required: { value: true, message: "lastName is required" },
                })}
                className="p-2 rounded-sm mb-2 bg-[#eeeeee]"
                id="firstName"
                placeholder="LastName"
              />
            </div>
          </div>

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
              Create Account
            </button>
          </div>
        </form>
        <div className="mt-8">
          <p>
            {" "}
            Already have an account ?{" "}
            <Link to={"/login"}>
              {" "}
              <span className="font-medium">login Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
