import {combineReducers} from 'redux'
import categoryReducer from './Category/categoryReducer'
import usersReducer from './login/usersReducer'
import productReducer from './Product/productReducer'

const rootReducer= combineReducers({
    login:usersReducer,
    category:categoryReducer,
    product:productReducer
})
export default rootReducer