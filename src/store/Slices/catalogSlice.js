import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "../States/InitialStateCatalog";

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    addCatalog(state, action) {
      state.catalog.push({
        title: action.payload.title,
        url: action.payload.url,
        link: action.payload.link
      })
    },
    deleteCatalog(state, action) {},
    toggleCatalog(state, action) {}
  }
})

export const {addCatalog, deleteCatalog, toggleCatalog} = catalogSlice.actions;
export default catalogSlice.reducer;