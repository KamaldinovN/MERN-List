import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./Slice/user"

const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;
