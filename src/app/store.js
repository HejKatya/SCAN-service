import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import accessTokenSliceReducer from '../slices/accessTokenSlice';
import companyLimitSliceReducer from '../slices/companyLimitSlice'
import histogramsSliceReducer from '../slices/histogramsSlice';
import searchParamsSliceReducer from '../slices/searchParamsSlice';
import documentIdsSliceReducer from '../slices/documentIdsSlice';
import documentsSliceReducer  from '../slices/documentsSlice';


const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })
export const store = configureStore({
    middleware: customizedMiddleware,
    reducer: {
        accessToken: accessTokenSliceReducer,
        companyLimit: companyLimitSliceReducer,
        histograms: histogramsSliceReducer,
        searchParams: searchParamsSliceReducer,
        documentIds: documentIdsSliceReducer,
        documents: documentsSliceReducer
    }
})

