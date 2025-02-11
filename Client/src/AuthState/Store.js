import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage
};

const persistAuthReducer = persistReducer(persistConfig,authReducer);

export const Store = configureStore({
    reducer:{auth:persistAuthReducer}
});

export const Persiststore = persistStore(Store);