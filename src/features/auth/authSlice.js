import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, username: 'admin1', password: 'admin1', role: 'admin' },
    { id: 2, username: 'admin2', password: 'admin2', role: 'admin' },
    { id: 3, username: 'user1', password: 'user1', role: 'user' },
    { id: 4, username: 'user2', password: 'user2', role: 'user' },
  ],
  loggedInUser: null,  // This will hold the current logged-in user info
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        user => user.username === username && user.password === password
      );
      if (user) {
        state.loggedInUser = user;  // Set the logged-in user
      } else {
        state.loggedInUser = null;
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
