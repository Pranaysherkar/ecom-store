import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import axios from "../../api/AxiosConfig"; // make sure your API baseURL is here
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productAction";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (product) => {
    product.id = nanoid(); // generate unique id
    const result = await dispatch(asyncCreateProduct(product)); // dispatch action to create product
    console.log(result.success, "result is here");

    if (result?.success === true) toast.success(result.message);
    else toast.error(result.message || "Failed to create product");
    navigate("/products"); // redirect to products page
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-900 text-white w-full max-w-md p-6 rounded-xl border border-slate-700 shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Product</h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 rounded bg-slate-800 focus:ring-2 focus:ring-sky-500"
            placeholder="Product title"
          />
          <p className="text-sm text-red-400">{errors.title?.message}</p>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full px-3 py-2 rounded bg-slate-800 focus:ring-2 focus:ring-sky-500"
            placeholder="00.00"
          />
          <p className="text-sm text-red-400">{errors.price?.message}</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 rounded bg-slate-800 focus:ring-2 focus:ring-sky-500"
            placeholder="Product description"
          />
          <p className="text-sm text-red-400">{errors.description?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="w-full px-3 py-2 rounded bg-slate-800 focus:ring-2 focus:ring-sky-500"
            placeholder="Product Category"
          />
          <p className="text-sm text-red-400">{errors.category?.message}</p>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="w-full px-3 py-2 rounded bg-slate-800 focus:ring-2 focus:ring-sky-500"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-sm text-red-400">{errors.image?.message}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-sky-500 hover:bg-sky-600 rounded-md font-semibold transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
