let initalState = [];

if(localStorage.getItem('cart')) {
    initalState = JSON.parse(localStorage.getItem('cart'));
}

export const cartReducer  = (state = initalState, action) => {
    switch(action.type) {
        case "ADD_TO_CART": 
        return action.payload;
        default:
            return state;
    }
}