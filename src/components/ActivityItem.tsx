import React from 'react';
import {Checkbox} from "primereact/checkbox";
import {Activity} from "../generated/api";
import {format} from "date-fns";
import {Button} from "primereact/button";

type Props = {
    activity: Activity
    doneToggle: (a: Activity) => void,
    removeActivity: (a: Activity) => void,

}

type ActivityItemState = {

}

export default class ActivityItem extends React.Component<Props, ActivityItemState> {


    longToString = (date?: number) => {
        if (!date) {
            return 'unknown';
        }
        return format(new Date(date!), 'yyyy-MM-dd');
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
                        <i className="pi pi-calendar p-mr-2"/> <span className={"date"}>{this.longToString(this.props.activity.date)}</span>
                    </div>
                </div>
                <div className="done-block my-auto flex flex-row ">
                    <Checkbox inputId="binary"
                              className={'my-auto'}
                              checked={this.props.activity.done}
                              onChange={e => this.setChecked(e.checked)} />

                    <Button icon="pi pi-times"
                            className="p-button-rounded p-button-text my-auto p-button-danger"
                            onClick={(event) => this.props.removeActivity(this.props.activity) }
                    />
                </div>
            </div>);
    }



}
