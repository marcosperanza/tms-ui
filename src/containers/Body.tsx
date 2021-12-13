import {Dispatch} from "react";
import {connect} from "react-redux";
import {Body} from "../components/Body";
import {loginUserName} from "../store/actionCreators";
import {RootState} from "../store";

const mapStateToProps = (state: RootState) => ({
    username: state.login.username,
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
