import React from 'react';
import ActivityItem from "./ActivityItem";
import {Activity} from "../generated/api";

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
            <div id="activity-list" className="flex flex-row-reverse flex-wrap shadow-2 my-3 p-2 border-round">
                {this.props.activities.map((act, index) =>
                    <ActivityItem key={index} activity={act!} doneToggle={this.props.doneToggle}/>
                )}
            </div>);
    }

}

