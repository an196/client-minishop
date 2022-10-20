import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { apiSlice } from './api/apiSlice';
import authReducer from '~/features/auth/authSlice';
import otpReducer from '~/features/otp/otpSlice';
import productReducer from '~/features/product/productSlice';

const rootPersistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	otp: otpReducer,
	product: productReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
	devTools: true,
});

export const persistor = persistStore(store);
