import {combineReducers} from 'redux'

function changeHeight(state = 'test', action) {
    console.log(action);
    return state;
}

const testApp = combineReducers({
    changeHeight
});

export default testApp;