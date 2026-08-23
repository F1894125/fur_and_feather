import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import wizardReducer from "./slices/formSlice";
import loadingReducer from "./slices/loadingSlice";
import adopterReducer from "./slices/adopterSlice";
import petReducer from "./slices/PetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wizard: wizardReducer,
    loading: loadingReducer,
    adopter: adopterReducer,
    pet: petReducer,
  },
});
export default store;
