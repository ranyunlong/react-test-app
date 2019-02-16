import { createStore, combineReducers } from 'redux'
import  admin from './reducers/admin'

const store = createStore(
    combineReducers({
        admin
    })
)

export default store