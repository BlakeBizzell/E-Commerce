import { createSlice } from "@reduxjs/toolkit";
import { soapApi } from "../api/soapApi";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  extraReducers: (builder) => {
    builder.addMatcher(
      soapApi.endpoints.getProduct.matchFulfilled,
      (state, { payload }) => {
        return payload.results;
      }
    );
  },
});

export default productSlice;
