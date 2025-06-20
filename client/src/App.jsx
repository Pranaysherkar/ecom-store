import React, { useEffect } from "react";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { asyncCurrentUser } from "./store/actions/userAction";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="h-14 w-full">
        <Nav />
      </div>
      <Mainroutes />
    </div>
  );
};

export default App;
