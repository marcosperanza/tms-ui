import React, { useState } from 'react';
import {Activity} from "../generated/api";
import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";

type Props = {
    createActivity: (activity: Activity | any) => void
}

export const NewActivity: React.FC<Props> = ({ createActivity }) => {

    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [showNewDialogue, setshowNewDialogue] = useState(false);

    const addNewActivity = (e: React.FormEvent) => {
        e.preventDefault()
        createActivity({description, date: 1} as Activity)
        setshowNewDialogue(!showNewDialogue);
    }

    function showNew() {
        setshowNewDialogue(!showNewDialogue);

    }

    return (
        <div className="flex flex-row flex-wrap ">
            { !showNewDialogue &&
                <Button label="New" className="float-right p-button-sm  mb-2 p-button-outlined p-button-secondary"  onClick={showNew}/>
            }

            {
                showNewDialogue &&
              <div className="shadow-4 p-2 border-round w-full">
                <h2 className="mx-auto">Add Task</h2>
                <div className="mt-4">
                    <label htmlFor="description">Description</label>
                    <InputText className="w-full" id="description" value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="date">Date</label>
                    <InputMask className="w-full m" id="date" mask="9999-99-99" value={date} placeholder="99/99/9999"
                               slotChar="yyyy-mm-dd" onChange={(e) => setDate(e.value)}/>
                </div>

                <Button label="Save"
                        disabled={!(!!description && !!date)}
                        className="float-right p-button-sm mt-2 p-button-outlined p-button-secondary"
                        onClick={addNewActivity}/>

            </div>}
        </div>

    )
}
