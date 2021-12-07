import {Activity} from "../generated/api";
import {Action, ADD_ACTIVITY, AddActivityAction} from "../type";

export type ActivityState = {
    activities: Activity[]
}

const initialState: ActivityState = {
    activities: [],
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

    }
    return state
}

export default reducer
