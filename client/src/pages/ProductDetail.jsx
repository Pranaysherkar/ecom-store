import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { asyncUpdateProduct } from "../store/actions/productAction";

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.productReducer.data);
  const product = products?.find((item) => item.id === id);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset(product); // ✅ Reset form with product data
    }
  }, [product, reset]);

  const onSubmit = async (updatedData) => {
    const result = await dispatch(asyncUpdateProduct(updatedData, id));
    if (result?.success) {
      toast.success("Product updated");
      setIsEdit(false); // ✅ Toggle back to view mode
    } else {
      toast.error("Update failed");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12 flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Image */}
      <div className="w-full md:w-1/3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded-xl shadow-xl object-cover h-auto max-h-[450px]"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 max-w-xl space-y-4"
      >
        <input
          {...register("title", { required: "Title is required" })}
          disabled={!isEdit}
          className="w-full p-2 bg-slate-800 rounded focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-sm text-red-400">{errors.title?.message}</p>

        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          disabled={!isEdit}
          className="w-full p-2 bg-slate-800 rounded focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-sm text-red-400">{errors.price?.message}</p>

        <textarea
          {...register("description", { required: "Description is required" })}
          disabled={!isEdit}
          className="w-full p-2 bg-slate-800 rounded focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-sm text-red-400">{errors.description?.message}</p>

        <input
          {...register("category", { required: "Category is required" })}
          disabled={!isEdit}
          className="w-full p-2 bg-slate-800 rounded focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-sm text-red-400">{errors.category?.message}</p>

        <input
          {...register("image", { required: "Image URL is required" })}
          disabled={!isEdit}
          className="w-full p-2 bg-slate-800 rounded focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-sm text-red-400">{errors.image?.message}</p>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          {!isEdit ? (
            <button
              type="button"
              onClick={() => setIsEdit(true)}
              className="w-24 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="w-24 px-5 py-2 bg-sky-500 hover:bg-sky-600 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  reset(product);
                  setIsEdit(false);
                }}
                className="w-24 px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-md"
              >
                Cancel
              </button>
            </>
          )}

          <button
            type="button"
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-sky-500 hover:bg-sky-600 rounded-md"
          >
            Buy Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
