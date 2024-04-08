import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:false,
    userId:null,
    authToken:null,
  },
  reducers: {
    setAuthtoken: (state, action) => {
        state.authToken = action.payload;
      },
      setUser: (state) => {
        state.user = true;
      },
      setUserID: (state,action) => {
        state.userId = action.payload;
      },
      logout: (state) => {
        state.user = false;
        state.authToken = null;
      },
  },
});

export const {  logout,setUser,setAuthtoken,setUserID } = authSlice.actions;
export default authSlice.reducer;