import { configureStore } from "@reduxjs/toolkit";
import { soapApi } from "../api/soapApi";
import productsSlice from "../slice/getProductsSlice";
import productSlice from "../slice/getProductSlice";

export const store = configureStore({
  reducer: {
    [soapApi.reducerPath]: soapApi.reducer,
    products: productsSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(soapApi.middleware),
});

export default store;
