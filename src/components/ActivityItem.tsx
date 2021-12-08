import React from 'react';
import {Checkbox} from "primereact/checkbox";

type Props = {
    id: string,
    description: string,
    date: number,
    done: boolean
}

type ActivityItemState = {

}

export default class ActivityItem extends React.Component<Props, ActivityItemState> {


    longToString = (date: number) => {
        return new Date(date).toLocaleDateString();
    }

    setChecked = (checked: boolean) => {

    }

    render() {
        return (
            <div id="activity-item" className="activity-item shadow-2 my-2 p-4 border-round w-full flex flex-row flex-nowrap justify-content-between">
                <div id="description-block" className="flex flex-column flex-nowrap">
                    <div id="description-item">
                        {this.props.description}
                    </div>
                    <div id="date-item" className="my-2">
                        <span><i className="pi pi-calendar p-mr-2"/> {this.longToString(this.props.date)}</span>
                    </div>
                </div>
                <div id="done-block" className="p-field-checkbox my-auto">
                    <Checkbox inputId="binary" checked={this.props.done} onChange={e => this.setChecked(e.checked)} />
                </div>
            </div>);
    }



}
