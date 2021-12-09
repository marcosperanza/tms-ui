import {ActivityState} from "../store/reducer";
import {connect} from "react-redux";
import {ActivityList} from "../components/ActivityList";
import {Dispatch} from "react";
import {editActivity, fetchActivities} from "../store/actionCreators";
import {Activity} from "../generated/api";

const mapStateToProps = (state: ActivityState) => ({
    activities: state.activities,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchActivities: () => fetchActivities(dispatch),
        doneToggle: (a: Activity) => editActivity(a, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList)
