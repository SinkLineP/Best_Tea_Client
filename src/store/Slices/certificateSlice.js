import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initialState} from "../States/InitialStateCertificate";
import {HTTP, DOMAIN_SERVER, PORT} from "../../Variables/ServerConfig";


export const fetchCertificates = createAsyncThunk(
  "certificatesData/fetchCertificates",
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/certificates`);
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

export const addNewCategory = createAsyncThunk(
  "certificatesData/addNewCategory",
  async function(certificateObject, {rejectWithValue, dispatch}) {
    try {
      const {title, desc} = certificateObject;

      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/certificates/0`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoriesCertificate: [
            {
              title: title,
              desc: desc,
              content: [],
            }
          ]
        })
      });



      if (!response.ok) {
        throw new Error("Cant add user! Server error.");
      }

      const data = await response.json();
      console.log(data);
      dispatch(createCertificateCategory(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)


export const deleteOneCategoryCertificate = createAsyncThunk(
  "certificatesData/deleteOneCategoryCertificate",
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/certificates/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Cant delete certificate Category!. Server error");
      }

      dispatch(deleteOneCategory({id}))
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)


const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
}

const certificateSlice = createSlice({
  name: "certificatesData",
  initialState,
  reducers: {
    createCertificateCategory(state, action) {
      state.certificatesData.push(action.payload);
    },
    deleteOneCategory(state, action) {
      state.certificatesData = state.certificatesData.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchCertificates.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [fetchCertificates.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.certificatesData = action.payload;
    },
    [fetchCertificates.rejected]: setError,
    // [deleteUser.rejected]: setError
  }
})

export const {createCertificateCategory, deleteOneCategory} = certificateSlice.actions;
export default certificateSlice.reducer;