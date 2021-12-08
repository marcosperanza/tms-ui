import {Activity} from "../generated/api";
import {Action, ADD_ACTIVITY, AddActivityAction, ERROR} from "../type";

export type ActivityState = {
    activities: Activity[],
    error: string
}

const initialState: ActivityState = {
    activities: [],
    error: ''
}


const reducer = (
    state: ActivityState = initialState,
    action: Action
): ActivityState => {
    switch (action.type) {
        case ADD_ACTIVITY:
            const newArticle: Activity = {
                id: (action as AddActivityAction).payload.id,
                date: (action as AddActivityAction).payload.date,
                description: (action as AddActivityAction).payload.description,
                done: (action as AddActivityAction).payload.done
            }
            return {
                ...state,
                activities: state.activities.concat(newArticle),
            }
        case ERROR:
            return {
                ...state,
                error: action.payload.errorMessage,
            }


    }
    return state
}

export default reducer
