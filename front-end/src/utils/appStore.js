import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userSlice'
import feedReducer from './feedUser'
import connectionReducer from './connectionSlice'
import requestSlice from './requestSlice'

 const appStore = configureStore({
  reducer: {
    user:userReducer,
    feed:feedReducer,
    connection:connectionReducer,
    request:requestSlice
  },
})
export default appStore