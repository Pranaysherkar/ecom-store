import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  asyncDeleteProduct,
  asyncUpdateProduct,
} from "../store/actions/productAction";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.productReducer.data);
  const user = useSelector((state) => state.userReducer.data);
  console.log(user.isAdmin);

  const product = products?.find((item) => item.id === id);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: product,
  });

  const onSubmit = async (data) => {
    console.log("Updated:", data);
    const result = await dispatch(asyncUpdateProduct(data, id));
    setEditMode(false);
    if (result.success) {
      reset(data);
      toast.success("Product updated successfully");
    } else {
      toast.error(result.message || "Failed to update product");
    }
  };
  const deleteHandler = async () => {
    const result = await dispatch(asyncDeleteProduct(id));
    if (result.success) {
      toast.success("Product deleted successfully");
      navigate("/products");
    } else {
      toast.error(result.message || "Failed to delete product");
    }
  };
  useEffect(() => {
    if (product) {
      reset(product); // update form values when product arrives
    }
  }, [product, reset]);

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
      <div className="w-full md:w-1/3 h-[450px]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full rounded-xl shadow-xl object-cover"
        />
      </div>

      {/* Product Details */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 h-[450px] max-w-xl bg-slate-800 px-6 py-8 rounded-lg shadow-lg overflow-auto space-y-6"
      >
        {/* Title */}
        <input
          {...register("title", { required: true })}
          readOnly={!editMode}
          className={`text-3xl font-bold w-full outline-none transition-all duration-200 ${
            editMode ? "bg-slate-700 p-2 rounded" : "bg-transparent"
          }`}
        />

        {/* Price */}
        <div className="flex items-center text-xl text-green-400">
          ₹
          <input
            {...register("price", { required: true })}
            type="number"
            readOnly={!editMode}
            className={`outline-none w-full ml-1 transition-all duration-200 ${
              editMode ? "bg-slate-700 p-2 rounded" : "bg-transparent"
            }`}
          />
        </div>

        {/* Description */}
        <textarea
          {...register("description", { required: true })}
          readOnly={!editMode}
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className={`text-lg text-gray-300 w-full outline-none resize-none transition-all duration-200 ${
            editMode ? "bg-slate-700 p-2 rounded" : "bg-transparent opacity-75"
          }`}
        />

        {/* Category */}
        <input
          {...register("category", { required: true })}
          readOnly={!editMode}
          className={`text-lg tracking-wider text-sky-400 w-full outline-none transition-all duration-200 ${
            editMode ? "bg-slate-700 p-2 rounded" : "bg-transparent"
          }`}
        />

        {/* Image URL */}
        {editMode && (
          <input
            {...register("image", { required: true })}
            className="text-sm text-gray-400 bg-slate-700 p-2 rounded w-full outline-none break-all"
          />
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-4 [&>*]:cursor-pointer">
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
          {user?.isAdmin && (
            <>
              {" "}
              <button
                type="button"
                onClick={deleteHandler}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-md"
              >
                Delete{" "}
              </button>{" "}
              {editMode ? (
                <>
                  <button
                    type="submit"
                    className="w-20 px-5 py-2 bg-sky-400 hover:bg-sky-500 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      reset(product);
                      setEditMode(false);
                    }}
                    className="w-20 p-2 bg-gray-500 hover:bg-gray-600 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="w-20 px-5 py-2 bg-slate-500 hover:bg-slate-600 rounded-md"
                >
                  Edit
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
