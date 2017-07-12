import { combineReducers } from 'redux'
import todos from './todos'
import changeHeight from './changeHeight'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    todos,
    changeHeight,
    visibilityFilter
});

export default todoApp