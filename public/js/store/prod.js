import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const creataStoreWithMiddleware = applyMiddleware(apiMiddleware, thunk)(createStore)

export default function configureStore(initialStore) {
    return creataStoreWithMiddleware(rootReducer, initialStore)
}
