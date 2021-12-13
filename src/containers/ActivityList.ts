import {connect} from "react-redux";
import {ActivityList} from "../components/ActivityList";
import {Dispatch} from "react";
import {editActivity, fetchActivities, removeActivity} from "../store/actionCreators";
import {Activity} from "../generated/api";
import {RootState} from "../store";

const mapStateToProps = (state: RootState) => ({
    activities: state.activity.activities,
    loading: state.activity.progress,
    username: state.login.username,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchActivities: () => fetchActivities(dispatch),
        doneToggle: (a: Activity) => editActivity(a, dispatch),
        removeActivity: (a: Activity) => removeActivity(a, dispatch)
    }
}


/**
 * The container of the {@link ActivityList} component. The goal of this container is to decoupling the redux pattern
 * to the component itself.
 * It inject the {@link ActivityState} in the component Props.
 */
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList)

