import React from 'react';
import ActivityItem from "./ActivityItem";
import {Activity} from "../generated/api";
import classNames from "classnames";

type Props = {
    activities: Activity[];
    fetchActivities: () => void,
    doneToggle: (a: Activity) => void,

}

type ActivityListState = {
}

export class ActivityList extends React.Component<Props, ActivityListState> {

    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchActivities();
    }

    render() {
        return (
            <div id="activity-list" className={classNames({
                'flex': true,
                'flex-wrap': true,
                'shadow-2': this.props.activities.length > 0,
                'my-3': true,
                'px-2': true,
                'border-round': this.props.activities.length > 0
                }
            )}>
                {this.props.activities.length > 0 && this.props.activities.map((act, index) =>
                    <ActivityItem key={index} activity={act!} doneToggle={this.props.doneToggle}/>
                )}
                {this.props.activities.length === 0 &&
                <div className={'mx-auto'}> No activity found.</div>

                }
            </div>);
    }

}

