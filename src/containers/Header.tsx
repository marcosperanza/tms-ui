import {Dispatch} from "react";
import {login} from "../store/actionCreators";
import {connect} from "react-redux";
import {Header} from "../components/Header";
import {RootState} from "../store";

const mapStateToProps = (state: RootState) => ({
    username: state.login.username
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        login: () => login(dispatch)
    }
}

/**
 * The container of the {@link NewActivity} component. The goal of this container is to decoupling the redux pattern
 * to the component itself.
 * It inject the {@link ActivityState} in the component Props.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Header)
