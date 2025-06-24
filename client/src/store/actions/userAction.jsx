import axios from "../../api/AxiosConfig";
import { loaduser, removeuser } from "../reducers/userSlice";

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    // 1. Check if email already exists
    const { data: existingUsers } = await axios.get(
      `/users?email=${user.email}`
    );
    if (existingUsers.length > 0) {
      return { success: false, message: "Email already exists" };
    }

    // 2. If not, proceed to register
    const { data } = await axios.post("/users", user);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const { data: existingUsers } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );

    if (existingUsers.length === 0) {
      return { success: false };
    } else {
      const loggedInUser = existingUsers[0];
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      dispatch(loaduser(loggedInUser));
      return { success: true };
    }
  } catch (error) {
    return { success: false };
  }
};

export const asyncCurrentUser = () => (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
    else return { success: false, message: "No user found" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const asyncLogoutUser = (user) => (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const asyncUpdateUser = (user, id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch(`/users/${user.id}`, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asyncCurrentUser());
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const asyncDeleteUser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch(asyncLogoutUser());
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
