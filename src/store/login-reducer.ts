import {Action, LOGIN, LOGIN_USERNAME} from "../type";


/**
 * The login state stored
 */
export type LoginState = {
    username: string
}

/**
 * Initial state
 */
export const initialState: LoginState = {
    username: ''
}


/**
 * Login reducer
 * @param state the current application state
 * @param action the action dispatched
 * @return the modified {@link LoginState}
 */
const loginReducer = (
    state: LoginState = initialState,
    action: Action
): LoginState => {
    switch (action.type) {
        case LOGIN:
        case LOGIN_USERNAME:
            return {
                ...state,
                username: action.payload
            }
    }
    return state
}

export default loginReducer
