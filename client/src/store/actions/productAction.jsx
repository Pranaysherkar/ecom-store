import axios from "../../api/AxiosConfig";
import { loadproducts } from "../reducers/productSlice";

export const asyncLoadProduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadproducts(data));
    return { success: true, message: "Products loaded successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncLoadProduct());
    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const asyncUpdateProduct =
  (product, id) => async (dispatch, getState) => {
    try {
      await axios.patch(`/products/${id}`, product);
      dispatch(asyncLoadProduct());
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/products/` + id);
    dispatch(asyncLoadProduct());
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
