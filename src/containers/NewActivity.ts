import {ActivityState} from "../store/reducer";
import {Dispatch} from "react";
import {Activity} from "../generated/api";
import {addActivity} from "../store/actionCreators";
import {connect} from "react-redux";
import {NewActivity} from "../components/NewActivity";

const mapStateToProps = (state: ActivityState) => ({
    progress: state.progress.add,
    communicationError: state.error,
    activities: state.activities,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        createActivity: (a: Activity) => addActivity(a, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActivity)
