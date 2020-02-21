import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import climbs from './climbs';
import login from './login';
import register from './register'
import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native'

const config = {
    key: 'root',
    debug: true
}

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

const reducer = combineReducers({
    climbs,
    login,
    register
})

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
