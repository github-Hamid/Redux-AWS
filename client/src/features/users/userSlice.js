import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
const initialState = { users: [] };

const POSTS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("/posts/users", async () => {
  let response = await fetch(POSTS_URL);
  let json = await response.json();
  return json;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      let newState = produce(state, (oldState) => {
        oldState.users = action.payload.slice();
      });
      return newState;
    });
  },
});

export const selectAllUsers = (state) => {
  return state.users.users;
};
export const selectUserById = (state, id) => {
  return state.users.users.find((user) => {
    return Number(user.id) === Number(id);
  });
};
export default userSlice.reducer;
