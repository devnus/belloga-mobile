import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  birthYear: '',
  accessToken: '',
  refreshToken: '',
  points: 0,
  tempPoints: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.birthYear = action.payload.birthYear;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setInitial(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.email = '';
      state.name = '';
      state.birthYear = '';
      state.phoneNumber = '';
      state.points = 0;
      state.tempPoints = 0;
    },
    setPoints(state, action) {
      state.points = action.payload.points;
      // state.tempPoints = action.payload.tempPoints;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
