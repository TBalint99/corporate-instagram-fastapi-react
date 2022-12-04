import React, { createContext, useReducer } from "react";

export const User = createContext()

const initialState = {
    userAuth: localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null,
    userAuthType: localStorage.getItem('authTokenType') ? localStorage.getItem('authTokenType') : null,
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null
}

function reducer(state, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, userAuth: action.payload.access_token, userAuthType: action.payload.token_type, userId: action.payload.user_id }
        case 'USER_LOGOUT':
            return { ...state, userAuth: null, userAuthType: null, userId: null }
        default:
            break;
    }
}

export function UserProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}

    return <User.Provider value={value}>{props.children}</User.Provider>
}
