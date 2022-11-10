import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "../States/InitialStateCategory.js";

const categoriesNavbarSearchSlice = createSlice({
  name: "categoriesNavbarSearch",
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categoryNavbarSearch.firstCategory.push({
        title: action.payload.title,
        link: action.payload.link,
        countSorts: action.payload.count,
        content: action.payload.content,
        categoryThisItem: action.payload.categoryThisItem
      })
    },
    deleteCategory(state, action) {},
    toggleCategoryComplete(state, action) {}
  }
})

export const {addCategory, deleteCategory, toggleCategoryComplete} = categoriesNavbarSearchSlice.actions;
export default categoriesNavbarSearchSlice.reducer;