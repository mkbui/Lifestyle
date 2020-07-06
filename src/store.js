import {createStore} from 'redux';
import {appReducer} from './reducers';

/* App Storage, managing states and dispatchers abstractly */
const store = createStore(appReducer);

export default store;