import {Activity} from "../generated/api";
import {Action, ADD_ACTIVITY, AddActivityAction, ERROR} from "../type";

export type ActivityState = {
    activities: Activity[],
    progress: boolean,
    error: string
}

const initialState: ActivityState = {
    activities: [],
    progress: false,
    error: ''
}


const reducer = (
    state: ActivityState = initialState,
    action: Action
): ActivityState => {
    switch (action.type) {
        case "ADD_ACTIVITY_RQ":
            return {
                ...state,
                progress: true
            }
        case ADD_ACTIVITY:
            const newArticle: Activity = {
                id: (action as AddActivityAction).payload.id,
                date: (action as AddActivityAction).payload.date,
                description: (action as AddActivityAction).payload.description,
                done: (action as AddActivityAction).payload.done
            }
            return {
                ...state,
                progress: false,
                activities: state.activities.concat(newArticle).sort((a1,a2) => a2.date! - a1.date!),
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
