import { configureStore } from '@reduxjs/toolkit'
import memberReducer from './redux/slices/memberSlice';

export const store = configureStore({
    reducer: {
        member:memberReducer,
    },
});