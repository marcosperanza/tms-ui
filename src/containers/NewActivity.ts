import {Dispatch} from "react";
import {Activity} from "../generated/api";
import {addActivity} from "../store/actionCreators";
import {connect} from "react-redux";
import {NewActivity} from "../components/NewActivity";
import {RootState} from "../store";

const mapStateToProps = (state: RootState) => ({
    progress: state.activity.progress.add,
    communicationError: state.error.error,
    activities: state.activity.activities,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        createActivity: (a: Activity) => addActivity(a, dispatch)
    }
}

/**
 * The container of the {@link NewActivity} component. The goal of this container is to decoupling the redux pattern
 * to the component itself.
 * It inject the {@link ActivityState} in the component Props.
 */
export default connect(mapStateToProps, mapDispatchToProps)(NewActivity)
