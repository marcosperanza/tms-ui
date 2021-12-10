import React from 'react';
import ActivityItem from "./ActivityItem";
import {Activity} from "../generated/api";
import classNames from "classnames";
import {ProgressInfo} from "../store/reducer";
import {ProgressSpinner} from "primereact/progressspinner";

type Props = {
    activities: Activity[];
    fetchActivities: () => void,
    doneToggle: (a: Activity) => void,
    removeActivity: (a: Activity) => void,
    loading: ProgressInfo
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
                {this.props.loading.fetch &&
                    <ProgressSpinner
                        style={{width: '50px', height: '50px'}}
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration=".5s"/>
                    }
                {this.props.activities.length > 0 && this.props.activities.map((act, index) =>
                    <ActivityItem
                        key={index}
                        activity={act!}
                        loading={this.props.loading}
                        doneToggle={this.props.doneToggle}
                        removeActivity={this.props.removeActivity}
                    />
                )}

                {this.props.activities.length === 0 && !this.props.loading.fetch &&
                <div className={'mx-auto'}> No activity found.</div>

                }
            </div>);
    }

}

