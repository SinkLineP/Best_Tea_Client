import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./Slices/categoriesSlice";
import currentUserReducer from "./Slices/currentUserSlice";
import catalogReducer from "./Slices/catalogSlice";
import productReducer from "./Slices/productsSlice";
import createUserReducer from "./Slices/createUserSlice";
import cityUserReducer from "./Slices/citySlice";
import certificateCategoryReducer from "./Slices/certificateSlice";

export default configureStore({
  reducer: {
    categoryNavbarSearch: categoryReducer,
    currentUser: currentUserReducer,
    catalog: catalogReducer,
    productList: productReducer,
    usersList: createUserReducer,
    allCityList: cityUserReducer,
    certificatesData: certificateCategoryReducer,
  }
})