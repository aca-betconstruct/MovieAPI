let movieStore = {
    movies: [],
};

let favStore = {
    favorites: {
        userId: {}
    }
};

export const SaveMoviesReducer = (state = movieStore, action) => {
    switch (action.type) {
        case "SAVE_MOVIES":
            return {
                ...state,
                movies: action.payload
            };
        default :
            return state;
    }
};

export const Favorites = (state = favStore, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    [action.payload.user_id]: {
                        ...action.payload.userId,
                        [Object.keys(action.payload.user_id).length]: action.payload.favMovie
                    }
                }
            };
        default :
            return state;
    }
};