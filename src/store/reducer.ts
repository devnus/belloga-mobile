import alertSlice from '@/slices/alert';
import {combineReducers} from 'redux';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  alert: alertSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
