import {ActivityState} from "../store/reducer";
import {connect} from "react-redux";
import {ActivityList} from "../components/ActivityList";
import {Dispatch} from "react";
import {editActivity, fetchActivities, removeActivity} from "../store/actionCreators";
import {Activity} from "../generated/api";

const mapStateToProps = (state: ActivityState) => ({
    activities: state.activities,
    loading: state.progress,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchActivities: () => fetchActivities(dispatch),
        doneToggle: (a: Activity) => editActivity(a, dispatch),
        removeActivity: (a: Activity) => removeActivity(a, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList)

