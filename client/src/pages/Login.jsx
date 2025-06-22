import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (user) => {
    // console.log("Form Data:", user);

    const result = await dispatch(asyncLoginUser(user));

    if (result?.success === true) {
      toast.success("Welcome !");
      navigate("/products");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white px-4">
      <div className="w-full max-w-md p-10 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-semibold mb-8 text-center tracking-wide">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="px-4 py-2 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <p className="text-sm text-red-400 min-h-[20px] mt-1">
              {errors.email?.message || " "}
            </p>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="px-4 py-2 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <p className="text-sm text-red-400 min-h-[20px] mt-1">
              {errors.password?.message || " "}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-sky-500 hover:bg-sky-600 cursor-pointer rounded-md font-semibold transition duration-200"
          >
            Login
          </button>

          {/* Link to Register */}
          <p className="text-center text-sm tracking-wide pt-2">
            Don’t have an account?{" "}
            <Link className="text-sky-300 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
