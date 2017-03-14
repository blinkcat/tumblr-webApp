import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const creataStoreWithMiddleware = applyMiddleware(apiMiddleware, createLogger())(createStore)

export default function configureStore(initialStore) {
    return creataStoreWithMiddleware(rootReducer, initialStore)
}
