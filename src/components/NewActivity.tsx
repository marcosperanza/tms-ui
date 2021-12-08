import React, {Component, useState} from 'react';
import {Activity} from "../generated/api";
import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";
import isMatch from 'date-fns/isMatch'

type Props = {
    createActivity: (activity: Activity | any) => void
}

type NewActivityState = {
    date: string,
    description: string,
    showNewDialogue: boolean,
    error: boolean
}

export default class NewActivity extends React.Component<Props, NewActivityState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            date: '',
            description: '',
            showNewDialogue: false,
            error: false
        }
    }

    addNewActivity = ()  => {
        const act: Activity = {
            id: '',
            description: this.state.description,
            date: this.covertToLong(this.state.date),
            done: false
        }

        this.props.createActivity(act);
    }

    covertToLong = (date: string) => {
        const d = new Date(date);
        return d.getTime();
    }

    toggle = () =>  {
        this.setState(prevState => ({
            showNewDialogue: !prevState.showNewDialogue
        }));
    }

    setDescription = (desc: string) => {
        this.setState(prevState => ({
            description: desc
        }));
    }

    setDate = (desc: string) => {
        this.setState(prevState => {
            let err = false;
            if (desc !== '' && !isMatch(desc, 'yyyy-mm-dd')) {
                err = true;
            }

            return ({date: desc, error: err});
        });
    }


    render() {
        return (
            <div className="flex flex-row flex-wrap ">
                { !this.state.showNewDialogue &&
                <Button id="open-new-activity-dialogue" label="New" className="float-right p-button-sm  mb-2 p-button-outlined p-button-secondary"  onClick={this.toggle}/>
                }

                {
                    this.state.showNewDialogue &&
                    <div id="newActivityDialogue" className="shadow-4 p-2 border-round w-full">
                        <h2 className="mx-auto">Add Task</h2>
                        <div className="mt-4">
                            <label htmlFor="description">Description</label>
                            <InputText className="w-full" id="description" value={this.state.description}
                                       onChange={(e) => this.setDescription(e.target.value)}/>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="date">Date</label>
                            <InputMask  id="date"
                                        className={'w-full ' + (this.state.error ? 'p-invalid': '')}
                                        mask="9999-99-99" value={this.state.date}
                                        slotChar="____-__-__"
                                        onChange={(e) => this.setDate(e.value)}/>
                        </div>

                        <Button label="Save"
                                disabled={!(!!this.state.description && !!this.state.date && !this.state.error)}
                                className="float-right p-button-sm mt-2 p-button-outlined p-button-secondary"
                                onClick={this.addNewActivity}/>

                    </div>}
            </div>);
    }

}
