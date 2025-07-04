import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const products = useSelector((state) => state.productReducer.data);

  return products.length > 0 ? (
    <div className="min-h-screen w-full bg-slate-950 px-4 sm:px-6 md:px-10 py-10">
      <h2 className="text-xl sm:text-2xl text-white font-bold mb-6 text-center sm:text-left">
        All Products
      </h2>

      <div className="w-full flex flex-wrap gap-8 justify-center ">
        {products.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="bg-slate-800 rounded-xl w-1/6 h-[50vh] overflow-hidden shadow-md border border-slate-700 flex flex-col "
          >
            <div className="w-full h-1/2 overflow-hidden aspect-square">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <div className="p-4 h-1/2 text-white flex flex-col justify-between ">
              <div>
                <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400">{item.category}</p>
                <p className="text-sm mt-1 line-clamp-2">
                  {item.description.slice(0, 60)} ...{" "}
                </p>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-sky-400 font-semibold text-sm">
                  ₹ {item.price}
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-md">
                   Add to Cart
                  </button>
                  <button className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white text-xs rounded-md">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-white text-center mt-10">Loading...</div>
  );
};

export default Products;
