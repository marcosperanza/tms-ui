import React from 'react';
import ActivityItem from "./ActivityItem";
import {Activity} from "../generated/api";
import {connect} from "react-redux";
import {ActivityState} from "../store/reducer";

type Props = {
    activities: Activity[];
}

type ActivityListState = {
}

export class ActivityList extends React.Component<Props, ActivityListState> {

    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id="activity-list" className="flex flex-row-reverse flex-wrap shadow-2 my-3 p-2 border-round">
                {this.props.activities.map(act =>
                    <ActivityItem description={act.description!} date={act.date!} done={act.done!} id={act.id!} />
                )}
            </div>);
    }

}

