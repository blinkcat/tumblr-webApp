import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from '../reducers'

const creataStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

export default configureStore(initialStore) {
    return creataStoreWithMiddleware(rootReducer, initialStore)
}
