import {Activity} from "../generated/api";
import {
    Action,
    ADD_ACTIVITY,
    ADD_ACTIVITY_RQ,
    AddActivityAction, EDIT_ACTIVITY, EDIT_ACTIVITY_RQ,
    ERROR,
    FETCH_ACTIVITY_RQ,
    SET_ACTIVITIES
} from "../type";

export type ActivityState = {
    activities: Activity[],
    progress: {
        add: boolean,
        fetch: boolean,
        edit: boolean
    },
    error: string
}

const initialState: ActivityState = {
    activities: [],
    progress: {
        add: false,
        edit: false,
        fetch: false,
    },
    error: ''
}


const reducer = (
    state: ActivityState = initialState,
    action: Action
): ActivityState => {
    switch (action.type) {
        case ADD_ACTIVITY_RQ:
            return {
                ...state,
                progress: {
                    ...state.progress,
                    add: true
                }
            }
        case FETCH_ACTIVITY_RQ:
            return {
                ...state,
                progress: {
                    ...state.progress,
                    fetch: true
                }
            }
        case EDIT_ACTIVITY_RQ:
            return {
                ...state,
                progress: {
                    ...state.progress,
                    edit: true
                }
            }
        case EDIT_ACTIVITY:
            let start = -1;
            for (let i = 0; i < state.activities.length; i++){
                const a = state.activities[i];
                if (a.id === action.payload.id) {
                    start = i;
                }
            }
            if (start === -1) {
                return state
            }

            const c = [...state.activities];
            c.splice(start, 1, action.payload);

            return {
                ...state,
                progress: {
                    ...state.progress,
                    edit: false
                },
                activities: c,
            }
        case SET_ACTIVITIES:
            return {
                ...state,
                progress: {
                    ...state.progress,
                    fetch: false
                },
                activities: action.payload.sort((a1,a2) => a2.date! - a1.date!),
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
                progress: {
                    ...state.progress,
                    add: false
                },
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
