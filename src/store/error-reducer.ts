import {Action, ERROR} from "../type";


/**
 * The login state stored
 */
export type ErrorState = {
    /**
     * The error details
     */
    error: any
}

/**
 * Initial state
 */
export const initialState: ErrorState = {
    error: undefined
}


/**
 * Error reducer
 * @param state the current application state
 * @param action the action dispatched
 * @return the modified {@link ErrorState}
 */
const errorReducer = (
    state: ErrorState = initialState,
    action: Action
): ErrorState => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return {
                ...state,
                error: undefined,
            }
    }
}

export default errorReducer
