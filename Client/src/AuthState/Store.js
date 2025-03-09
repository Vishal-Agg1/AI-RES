import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: "auth",
    storage,
    stateReconciler: hardSet, // ✅ Ensures Redux merges state properly
};

const persistAuthReducer = persistReducer(persistConfig,authReducer);

export const Store = configureStore({
    reducer:{auth:persistAuthReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // ✅ Fixes Redux Persist serialization warning
        }),
});

export const Persiststore = persistStore(Store);