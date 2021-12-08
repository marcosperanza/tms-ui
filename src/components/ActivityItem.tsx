import React from 'react';
import {Checkbox} from "primereact/checkbox";
import {Activity} from "../generated/api";

type Props = {
    activity: Activity
    doneToggle: (a: Activity) => void,

}

type ActivityItemState = {

}

export default class ActivityItem extends React.Component<Props, ActivityItemState> {


    longToString = (date?: number) => {
        if (!!date) {
            return 'unknown';
        }
        return new Date(date!).toLocaleDateString();
    }

    setChecked = (checked: boolean) => {
        const a: Activity = {
            ...this.props.activity,
            done: checked
        }
        this.props.doneToggle(a);
    }

    render() {
        return (
            <div className="activity-item shadow-2 my-2 p-4 border-round w-full flex flex-row flex-nowrap justify-content-between">
                <div className="description-block flex flex-column flex-nowrap">
                    <div className="description-item" >
                        {this.props.activity.description}
                    </div>
                    <div className="date-item my-2">
                        <span><i className="pi pi-calendar p-mr-2"/> {this.longToString(this.props.activity.date)}</span>
                    </div>
                </div>
                <div className="done-block p-field-checkbox my-auto">
                    <Checkbox inputId="binary" checked={this.props.activity.done} onChange={e => this.setChecked(e.checked)} />
                </div>
            </div>);
    }



}
