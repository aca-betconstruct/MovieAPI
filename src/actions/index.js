export const saveMovies = payload => {
    return {
        type: "SAVE_MOVIES",
        payload
    }
};

export const addFavorite = payload => {
    return {
        type: "ADD_FAVORITE",
        payload
    }
};

export const loadMovies = url => {
    return function (dispatch) {
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.results) {
                dispatch(saveMovies(data.results));
            }
        }).catch((err) => {
        });
    }
};