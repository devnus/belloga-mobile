import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  userId: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
