import {ActivityState} from "../store/reducer";
import {Dispatch} from "react";
import {connect} from "react-redux";
import {Body} from "../components/Body";
import {loginUserName} from "../store/actionCreators";

const mapStateToProps = (state: ActivityState) => ({
    username: state.username,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loggedUserName: () => loginUserName(dispatch)
    }
}

/**
 * The container of the {@link Body} component. The goal of this container is to decoupling the redux pattern
 * to the component itself.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Body)
