import {createStore} from 'redux';
import {AppReducer} from './reducers';

/* App Storage, managing states and dispatchers abstractly */
const store = createStore(AppReducer);

export default store;