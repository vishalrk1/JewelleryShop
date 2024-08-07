"use client";
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./auth/reducer";
import productsReducer from "./products/reducer";
import cartReducer from "./cart/reducer";
import wishlistReducer from "./wishlist/reducer";
import categoriesReducer from "./categories/reducer";
import ordersReducer from "./orders/reducer";
import feedbacksReducer from "./feedbacks/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  feedbacks: feedbacksReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const store = configureStore({
  //   reducer: rootReducer,
  reducer: persistReducer(persistConfig, rootReducer),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store, persistor };
