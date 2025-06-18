import axios from "../api/AxiosConfig";
import { loaduser } from "./userSlice";

export const getAsyncUsers = () => async (dispatch, getState) => {
    try {   
        const { data } = await axios.get("/users");
        dispatch(loaduser(data)); //dispatch is use to run action
        // console.log(getState()); // getState use to get current state of data
        
    } catch (error) {
        console.log(error);
    }
}