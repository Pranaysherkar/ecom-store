import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncUpdateUser,asyncDeleteUser } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.userReducer.data);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: user,
  });

  const onSubmit = async (data) => {
    data.isAdmin = data.isAdmin === "true";
    const result = await dispatch(asyncUpdateUser(data));
    if (result?.success) {
      toast.success("User updated");
      reset(data);
      setEditMode(false);
    } else {
      toast.error("Update failed");
    }
  };
  const handleDelete = async () => {
    const result = await dispatch(asyncDeleteUser(user.id));
    if (result?.success) {
      toast.success("User deleted successfully");
      reset();
      setEditMode(false);
    } else {
      toast.error("Delete failed");
    }
    navigate("/login");
  };

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white px-4 flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-900 border border-slate-700 rounded-xl p-8 w-full max-w-md shadow-xl space-y-4 
                   transition-all duration-500 ease-in-out"
      >
        <h2 className="text-2xl font-bold text-center border-b border-slate-700 pb-4">
          User Profile
        </h2>

        {/* Username */}
        <div>
          <label className="text-sm text-gray-400">Username</label>
          <input
            {...register("username", { required: true })}
            readOnly={!editMode}
            type="text"
            className={`w-full px-3 py-2 rounded outline-none transition-all duration-300 ease-in-out ${
              editMode
                ? "bg-slate-800 border border-sky-400 focus:ring-2 focus:ring-sky-400"
                : "bg-transparent"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-400">Email</label>
          <input
            {...register("email", { required: true })}
            readOnly={!editMode}
            type="email"
            className={`w-full px-3 py-2 rounded outline-none transition-all duration-300 ease-in-out ${
              editMode
                ? "bg-slate-800 border border-sky-400 focus:ring-2 focus:ring-sky-400"
                : "bg-transparent"
            }`}
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">Password</label>
          <input
            {...register("password", { required: true })}
            readOnly={!editMode}
            type="password"
            className={`w-full px-3 py-2 rounded outline-none transition-all duration-300 ease-in-out ${
              editMode
                ? "bg-slate-800 border border-sky-400 focus:ring-2 focus:ring-sky-400"
                : "bg-transparent"
            }`}
          />
        </div>

        {/* Role (Dropdown in edit mode) */}
        <div>
          <label className="text-sm text-gray-400">Role</label>
          {editMode ? (
            <select
              {...register("isAdmin")}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-sky-400 outline-none transition-all duration-300"
            >
              <option value={false}>Customer</option>
              <option value={true}>Seller</option>
            </select>
          ) : (
            <input
              value={user?.isAdmin ? "Seller (Admin)" : "Customer"}
              disabled
              className="w-full px-3 py-2 rounded bg-slate-800 outline-none opacity-70"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          {editMode && (
            <>
              <button
                type="submit"
                className="px-5 py-2 bg-sky-500 hover:bg-sky-600 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  reset(user);
                  setEditMode(false);
                }}
                className="px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </>
          )}
        </div>
        {!editMode && (
          <div className="w-full flex justify-center gap-12">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className=" px-5 py-2 bg-slate-600 hover:bg-slate-700 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className=" px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Delete Profile
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
