import React from 'react';
import {ProgressSpinner} from "primereact/progressspinner";
import NewActivity from "../containers/NewActivity";
import ActivityList from "../containers/ActivityList";


/**
 * the {@link Header} properties
 */
type Props = {
    loggedUserName: () => void;
    username: string;
}

type BodyState = {
    loggedUser: boolean
}

export class Body extends React.Component<Props, BodyState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            loggedUser: false
        }
    }

    componentDidMount() {
        if (!this.state.loggedUser) {
            this.props.loggedUserName();
        }
    }

    /**
     * Lifecycle, used for rendering the errors.
     */
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<BodyState>, snapshot?: any) {
        if (this.props?.username && (prevProps.username !== this.props?.username)) {
            this.setState({loggedUser: true});
        }
    }

    render() {
        return (
            <div>
                {!this.state.loggedUser &&
                <ProgressSpinner
                    style={{width: '50px', height: '50px'}}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"/>
                }
                {this.state.loggedUser &&
                <div className="md:w-6 md:m-auto p-2">
                    <NewActivity/>
                    <ActivityList/>
                </div>
                }
            </div>);

    }

}

