import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import adminReducer from "./adminReducer";
import commandReducer from "./commentReducer";

export const reducers = combineReducers({ authReducer, postReducer, adminReducer,commandReducer})