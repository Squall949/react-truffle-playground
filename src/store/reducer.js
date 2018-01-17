const initialState = {
    isSubscribed: new Map()
}

const reducer = (state = initialState, action) => {
    if (action.type === 'ADDUSERS') {
        const isSubscribed = new Map(
            [...state.isSubscribed, [action.userId, false]]
        );

        return {isSubscribed};
    } else if (action.type === 'SUBSCRIBE') {
        const isSubscribed = new Map(
            [...state.isSubscribed].map(([userId, isAdded]) => {
                if (userId === action.userId) {
                    return [userId, true];
                }
                return [userId, false];
            })
        );

        return {isSubscribed};
    }
    return state;
}

export default reducer;