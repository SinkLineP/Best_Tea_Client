import {initialState} from "../States/InitialStateProducts.js";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {HTTP, DOMAIN_SERVER, PORT, HEADERS} from "Variables/ServerConfig";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/tea`);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/tea/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Cant delete product!. Server error");
      }

      dispatch(deleteProduct({id}))
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProducts",
  async function(objectProduct, {rejectWithValue, dispatch}) {
    const {idWithParams, currentProduct} = objectProduct;

    try {
      const res = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/tea/${idWithParams}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: currentProduct.id,
          title: currentProduct.title,
          art: currentProduct.art,
          price: currentProduct.price,
          img: currentProduct.img,
          scented: currentProduct.scented,
          view: currentProduct.view,
          extras: currentProduct.extras,
          formOfRelease: currentProduct.formOfRelease,
          producer: currentProduct.producer,
          country: currentProduct.country,
          composition: currentProduct.composition,
          categories: currentProduct.categories,
          score: currentProduct.score,
          reviews: currentProduct.reviews,
          countProducts: currentProduct.countProducts,
          isStock: currentProduct.isStock,
          aboutProduct: currentProduct.aboutProduct,
          type: currentProduct.type,
          packaging: currentProduct.packaging,
        })
      });

      const data = await res.json();
      dispatch(editTeaProduct(data));

    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const addNewProductTea = createAsyncThunk(
  "products/addNewProductTea",
  async function(productObject, {rejectWithValue, dispatch}) {
    console.log(productObject);
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/tea`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productObject)
      });

      if (!response.ok) {
        throw new Error("Cant add product! Server error.");
      }

      const data = await response.json();
      dispatch(addTeaProduct(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
}

const productsSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    addTeaProduct(state, action) {
      state.teaList.push(action.payload);
    },
    editTeaProduct(state, action) {
      const toggleProduct = state.teaList.find(item => item.id === action.payload.id);
        toggleProduct.title = action.payload.title
        toggleProduct.art = action.payload.art
        toggleProduct.price = action.payload.price
        toggleProduct.img = action.payload.img
        toggleProduct.scented = action.payload.scented
        toggleProduct.view = action.payload.view
        toggleProduct.extras = action.payload.extras
        toggleProduct.formOfRelease = action.payload.formOfRelease
        toggleProduct.producer = action.payload.producer
        toggleProduct.country = action.payload.country
        toggleProduct.composition = action.payload.composition
        toggleProduct.categories = action.payload.categories
        toggleProduct.score = action.payload.score
        toggleProduct.reviews = action.payload.reviews
        toggleProduct.countProducts = action.payload.countProducts
        toggleProduct.isStock = action.payload.isStock
        toggleProduct.aboutProducts = action.payload.aboutProduct
        toggleProduct.type = action.payload.type
        toggleProduct.packaging = action.payload.packaging
    },
    deleteProduct(state, action) {
      state.teaList = state.teaList.filter(item => item.id !== action.payload.id);
    },
    toggleProduct(state, action) {
      const toggleProduct = state.teaList.find(item => item.id === action.payload.id);
      toggleProduct.completed = !toggleProduct.completed;
    }
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.teaList = action.payload;
    },
    [fetchProducts.rejected]: setError,
    [deleteProducts.rejected]: setError
  }
})

export const {addTeaProduct, deleteProduct, editTeaProduct} = productsSlice.actions;
export default productsSlice.reducer;