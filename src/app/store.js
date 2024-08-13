import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../features/courses/courseSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        courses: courseReducer,  // Manages course data
        auth: authReducer,       // Manages authentication and user data
    },
});
