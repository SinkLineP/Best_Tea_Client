import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initialState} from "../States/InitialStateNewUser";
import {HTTP, DOMAIN_SERVER, PORT} from "Variables/ServerConfig";
// import {editTeaProduct} from "./productsSlice";


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users`);
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

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async function(userObject, {rejectWithValue, dispatch}) {
    try {
      const {email, password, token, phone, name, surname, lastname, permission} = userObject;
      const CreateUserObject = {
        email: email,
        password: password,
        token: token,
        phone: phone,
        name: name,
        surname: surname,
        lastname: lastname,
        permission: {
          isAdmin: permission.isAdmin,
          isManager: permission.isManager,
          isUser: permission.isUser,
          isGuest: permission.isGuest
        }
      }
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CreateUserObject)
      });



      if (!response.ok) {
        throw new Error("Cant add user! Server error.");
      }

      const data = await response.json();
      console.log(data);
      dispatch(createUser(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)

export const togglePermsAdmin = createAsyncThunk(
  "users/toggleAdmin",
  async function (id, {rejectWithValue, dispatch, getState}) {
    const user = getState().usersList.usersData.find(user => user.id === id);
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission: {
            isAdmin: !user.permission.isAdmin,
            isManager: user.permission.isManager,
            isUser: user.permission.isUser,
            isGuest: user.permission.isGuest,
          }
        })
      });
      if (!response.ok) {
        throw new Error("Server Error! Cant toggle permission admin.");
      }
      const data = await response.json();
      dispatch(toggleAdmin(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)

export const togglePermsManager = createAsyncThunk(
  "users/toggleManager",
  async function (id, {rejectWithValue, dispatch, getState}) {
    const user = getState().usersList.usersData.find(user => user.id === id);
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission: {
            isAdmin: user.permission.isAdmin,
            isManager: !user.permission.isManager,
            isUser: user.permission.isUser,
            isGuest: user.permission.isGuest,
          }
        })
      });
      if (!response.ok) {
        throw new Error("Server Error! Cant toggle permission manager.");
      }
      const data = await response.json();
      dispatch(toggleManager(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)

export const togglePermsUser = createAsyncThunk(
  "users/toggleUser",
  async function (id, {rejectWithValue, dispatch, getState}) {
    const user = getState().usersList.usersData.find(user => user.id === id);
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission: {
            isAdmin: user.permission.isAdmin,
            isManager: user.permission.isManager,
            isUser: !user.permission.isUser,
            isGuest: user.permission.isGuest,
          }
        })
      });
      if (!response.ok) {
        throw new Error("Server Error! Cant toggle permission user.");
      }
      const data = await response.json();
      dispatch(toggleUser(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)

export const togglePermsGuest = createAsyncThunk(
  "users/toggleGuest",
  async function (id, {rejectWithValue, dispatch, getState}) {
    const user = getState().usersList.usersData.find(user => user.id === id);
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission: {
            isAdmin: user.permission.isAdmin,
            isManager: user.permission.isManager,
            isUser: user.permission.isUser,
            isGuest: !user.permission.isGuest,
          }
        })
      });
      if (!response.ok) {
        throw new Error("Server Error! Cant toggle permission guest.");
      }
      const data = await response.json();
      dispatch(toggleGuest(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
)

export const deleteOneUser = createAsyncThunk(
  "products/deleteUser",
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Cant delete user!. Server error");
      }

      dispatch(deleteUser({id}))
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const updateUser = createAsyncThunk(
  "products/updateProducts",
  async function(objectProduct, {rejectWithValue, dispatch}) {
    const {id, email, password, token, phone, name, surname, lastname, permission} = objectProduct;
    try {
      const res = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          token: token,
          phone: phone,
          name: name,
          surname: surname,
          lastname: lastname,
          permission: {
            isAdmin: permission.isAdmin,
            isManager: permission.isManager,
            isUser: permission.isUser,
            isGuest: permission.isGuest
          }
        })
      });

      const data = await res.json();
      console.log(data);
      dispatch(editUser(data));

    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
}

const usersSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    createUser(state, action) {
      state.usersData.push(action.payload);
    },
    editUser(state, action) {
      const User = state.usersData.find(user => user.id === action.payload.id);
      User.id = action.payload.id;
      User.email = action.payload.email;
      User.password = action.payload.password;
      User.token = action.payload.token;
      User.name = action.payload.name;
      User.lastname = action.payload.lastname;
      User.surname = action.payload.surname;
      User.phone = action.payload.phone;
      User.permission = action.payload.permission;
    },
    deleteUser(state, action) {
      state.usersData = state.usersData.filter(item => item.id !== action.payload.id);
    },
    toggleAdmin(state, action) {
      const toggledAdmin = state.usersData.find(item => item.id === action.payload.id);
      toggledAdmin.permission.isAdmin = !toggledAdmin.permission.isAdmin;
    },
    toggleManager(state, action) {
      const toggledManager = state.usersData.find(item => item.id === action.payload.id);
      toggledManager.permission.isManager = !toggledManager.permission.isManager;
    },
    toggleUser(state, action) {
      const toggledUser = state.usersData.find(item => item.id === action.payload.id);
      toggledUser.permission.isUser = !toggledUser.permission.isUser;
    },
    toggleGuest(state, action) {
      const toggledGuest = state.usersData.find(item => item.id === action.payload.id);
      toggledGuest.permission.isGuest = !toggledGuest.permission.isGuest;
    }
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.usersData = action.payload;
    },
    [fetchUsers.rejected]: setError,
    // [deleteUser.rejected]: setError
  }
})

export const {createUser, toggleAdmin, toggleManager, toggleUser, toggleGuest, deleteUser, addOrderToCart, editUser} = usersSlice.actions;
export default usersSlice.reducer;