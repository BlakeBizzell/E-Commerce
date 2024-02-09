import { createSlice } from "@reduxjs/toolkit";
import { soapApi } from "../api/soapApi";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  extraReducers: (builder) => {
    builder.addMatcher(
      soapApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        return payload.results;
      }
    );
  },
});

export default productsSlice;
