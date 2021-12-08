import React, {Dispatch} from 'react';
import {Activity} from "../generated/api";
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";
import isMatch from 'date-fns/isMatch'
import {ActivityState} from "../store/reducer";
import {connect} from "react-redux";
import {addActivity} from "../store/actionCreators";
import classNames from "classnames";

type Props = {
    createActivity: (activity: Activity | any) => void,
    progress: boolean
}

type NewActivityState = {
    date: string,
    description: string,
    showNewDialogue: boolean,
    error: boolean,
}

export class NewActivity extends React.Component<Props, NewActivityState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            date: '',
            description: '',
            showNewDialogue: false,
            error: false,
        }
    }

    addNewActivity = ()  => {
        const act: Activity = {
            description: this.state.description,
            date: this.covertToLong(this.state.date),
            done: false
        }

        this.props.createActivity(act);
    }

    covertToLong = (date: string) => {
        return Date.parse(date);
    }

    toggle = () =>  {
        let prevState: boolean = this.state.showNewDialogue;
        this.setState({
            showNewDialogue: !prevState
        });
    }

    setDescription = (desc: string) => {
        this.setState({
            description: desc
        });
    }

     public setDate = (desc: string) => {
         let err = false;
         if (desc !== '' && !isMatch(desc, 'yyyy-mm-dd')) {
             err = true;
         }
         this.setState({date: desc, error: err});
    }


    render() {
        return (
            <div className="flex flex-row flex-wrap ">
                { !this.state.showNewDialogue &&
                <Button id="open-new-activity-dialogue" label="New" className="float-right p-button-sm  mb-2 p-button-outlined p-button-secondary"  onClick={this.toggle}/>
                }

                {
                    this.state.showNewDialogue &&
                    <div id="newActivityDialogue" className="shadow-2 p-2 border-round w-full">
                        <h2 className="mx-auto">Add Task</h2>
                        <div className="mt-4">
                            <label htmlFor="description">Description</label>
                            <InputText className="w-full" id="description"
                                       value={this.state.description}
                                       onChange={(e) => this.setDescription(e.target.value)}/>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="date">Date</label>
                            <InputText  id="date"
                                        className={classNames({
                                            'w-full': true,
                                            'p-invalid': this.state.error
                                        })}
                                        onChange={(e) => this.setDate(e.target.value)}/>
                        </div>

                        <Button label="Save"
                                id={'save-activity'}
                                loading={this.props.progress}
                                disabled={!(!!this.state.description && !!this.state.date && !this.state.error)}
                                className="float-right p-button-sm mt-2 p-button-outlined p-button-secondary"
                                onClick={this.addNewActivity}/>

                    </div>
                }
            </div>);
    }

}
