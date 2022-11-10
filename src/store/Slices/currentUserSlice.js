import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "../States/InitialStateCurrentUser";


const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.lastname = action.payload.lastname;
      state.permission.isAdmin = action.payload.permission.isAdmin;
      state.permission.isManager = action.payload.permission.isManager;
      state.permission.isUser = action.payload.permission.isUser;
      state.permission.isGuest = action.payload.permission.isGuest;
    },
    removeCurrentUser(state) {
      state.id = 0;
      state.email = "Guest@mail.ru";
      state.password = "guestTest";
      state.token = "TOKEN:GUEST:0";
      state.phone = "89998887766";
      state.name = "guestName";
      state.surname = "guestSurname";
      state.lastname = "guestLastname";
      state.permission = {
        isAdmin: false,
        isManager: false,
        isUser: false,
        isGuest: true
      }
    },
  }
})

export const {setCurrentUser, removeCurrentUser} = currentUserSlice.actions;
export default currentUserSlice.reducer;