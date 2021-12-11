import React from 'react';
import {Checkbox} from "primereact/checkbox";
import {Activity} from "../generated/api";
import {format} from "date-fns";
import {Button} from "primereact/button";
import classNames from "classnames";
import {ProgressInfo} from "../type";

/**
 * The {@link ActivityItem}  properties.
 */
type Props = {
    activity: Activity
    doneToggle: (a: Activity) => void,
    removeActivity: (a: Activity) => void,
    loading: ProgressInfo,
}

type ActivityItemState = {

}

/**
 * Component for design the single activity item.
 */
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

    isLoading = () => {
        return this.props.loading.edit.indexOf(this.props.activity.id!) !== -1
                || this.props.loading.remove.indexOf(this.props.activity.id!) !== -1
    }

    render() {
        return (
            <div className={classNames({
               "activity-item": true,
               "shadow-2": true,
               "my-2": true,
               "p-4": true,
               "border-round": true,
               "w-full": true,
               "flex": true,
               "flex-nowrap": true,
               "justify-content-between": true,
               "loading": this.isLoading(),
               "done": this.props.activity.done
            })}>
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
                              disabled={this.isLoading()}
                              className={'my-auto'}
                              checked={this.props.activity.done}
                              onChange={e => this.setChecked(e.checked)} />

                    <Button icon="pi pi-times"
                            disabled={this.isLoading()}

                            className="p-button-rounded p-button-text my-auto p-button-danger"
                            onClick={(event) => this.props.removeActivity(this.props.activity) }
                    />
                </div>
            </div>);
    }
}
