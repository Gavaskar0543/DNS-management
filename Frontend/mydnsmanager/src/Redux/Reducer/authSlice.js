import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:false,
    authToken:null,
  },
  reducers: {
    setAuthtoken: (state, action) => {
        state.authToken = action.payload;
      },
      setUser: (state) => {
        state.user = true;
      },
      logout: (state) => {
        state.user = false;
        state.authToken = null;
      },
  },
});

export const {  logout,setUser,setAuthtoken } = authSlice.actions;
export default authSlice.reducer;