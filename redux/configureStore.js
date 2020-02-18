import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import climbs from './climbs';
import login from './login';
import register from './register'
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage'

const config = {
    key: 'root',
    // storage,
    debug: true
}
// export const ConfigureStore = () => {
//     const store = createStore(
//         persistCombineReducers(config, {
//             climbs
//         }),
//         applyMiddleware(thunk, logger)
//     );

//     const persistor = persistStore(store)

//     return { persistor, store };
// }
// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers(config, {
//             climbsReducer
//         }),
//         applyMiddleware(thunk, logger)
//     );
//     return { store };
// }
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

const reducer = combineReducers({
    climbs,
    login,
    register
})

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
