
let store = {
    movies: {}
};

export const SaveMoviesReducer = (state = store, action) => {
    switch (action.type) {
        case "SAVE_MOVIES":
            return {
                ...store,
                movies: action.payload
            };
        default :
            return state;
    }
};