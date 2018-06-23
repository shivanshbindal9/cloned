import { combineReducers } from 'redux';
import auth from "./auth";

const ponyApp = combineReducers({
  auth,
})

export default ponyApp;
