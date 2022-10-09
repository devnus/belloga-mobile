import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  titleMessage: '',
  middleMessage: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.isOpen = action.payload.isOpen;
      state.middleMessage = action.payload.titleMessage;
      state.middleMessage = action.payload.middleMessage;
    },
  },
  extraReducers: builder => {},
});

export default alertSlice;
