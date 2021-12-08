import React, {Component, useState} from 'react';
import {Activity} from "../generated/api";
import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";
import PropTypes from "prop-types";

type Props = {
    createActivity: (activity: Activity | any) => void
}

type NewActivityState = {
    date: string,
    description: string,
    showNewDialogue: boolean
}

export default class NewActivity extends React.Component<Props, NewActivityState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            date: '',
            description: '',
            showNewDialogue: false
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

    private covertToLong(date: string) {
        return 0;
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
        this.setState(prevState => ({
            date: desc
        }));
    }


    render() {
        return (
            <div className="flex flex-row flex-wrap ">
                { !this.state.showNewDialogue &&
                <Button label="New" className="float-right p-button-sm  mb-2 p-button-outlined p-button-secondary"  onClick={this.toggle}/>
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
                            <InputMask className="w-full m" id="date" mask="9999-99-99" value={this.state.date}
                                       slotChar="____-__-__" onChange={(e) => this.setDate(e.value)}/>
                        </div>

                        <Button label="Save"
                                disabled={!(!!this.state.description && !!this.state.date)}
                                className="float-right p-button-sm mt-2 p-button-outlined p-button-secondary"
                                onClick={this.addNewActivity}/>

                    </div>}
            </div>);
    }

}
