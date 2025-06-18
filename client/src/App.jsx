import React, { useEffect } from "react";
import { getAsyncUsers } from "./app/userAction";
import {useDispatch, useSelector} from "react-redux"
const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state)
  console.log(userData);
  

  useEffect(() => {
    dispatch(getAsyncUsers());
  }, []);

  return <div className="bg-black text-white h-screen w-full">App</div>;
};

export default App;
