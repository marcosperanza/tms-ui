import {ActivityState} from "../store/reducer";
import {connect} from "react-redux";
import {ActivityList} from "../components/ActivityList";

const mapStateToProps = (state: ActivityState) => ({
    activities: state.activities,
})

export default connect(mapStateToProps)(ActivityList)

