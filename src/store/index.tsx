import {combineReducers} from 'redux'
import loginReducer, {LoginState} from "./login-reducer";
import activityReducer, {ActivityState} from "./activity-reducer";
import errorReducer, {ErrorState} from "./error-reducer";


/**
 * The application state
 */
export type RootState = {
  activity: ActivityState,
  login: LoginState
  error: ErrorState
}

const rootReducer = combineReducers<RootState>({
  activity: activityReducer,
  login: loginReducer,
  error: errorReducer,
})

export default rootReducer
