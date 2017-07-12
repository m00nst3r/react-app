const changeHeight = (state = [], action) => {
    switch (action.type) {
        case 'CHANGE_HEIGHT':
            console.log(action.height);
            return [
                ...state,
                {
                    height: action.height
                }
            ];
        default:
            return state;
    }
};

export default changeHeight;