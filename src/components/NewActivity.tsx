import React from 'react';
import {Activity} from "../generated/api";
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import isMatch from 'date-fns/isMatch'
import classNames from "classnames";
import {Toast} from "primereact/toast";
import {InputMask} from "primereact/inputmask";
import {Calendar} from "primereact/calendar";
import {Dialog} from "primereact/dialog";
import {format} from "date-fns";

type Props = {
    createActivity: (activity: Activity | any) => void,
    progress: boolean,
    communicationError: any
    activities: Activity[],
}

type NewActivityState = {
    date: string,
    description: string,
    showNewDialogue: boolean,
    error: boolean,
    showCal: boolean
}

export class NewActivity extends React.Component<Props, NewActivityState> {
    toastBL: any;

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<NewActivityState>, snapshot?: any) {
        if (this.props?.communicationError && (prevProps.communicationError !== this.props?.communicationError)) {
            let statusText = this.props?.communicationError.statusText;
            if (statusText) {
                this.toastBL.current.show({severity:'error', summary: 'Error', detail: statusText, life: 3000});
            } else {
                this.toastBL.current.show({severity:'error', summary: 'Error', detail:'Some error occurs', life: 3000});

            }
        }
    }

    constructor(props: Props) {
        super(props);
        this.toastBL = React.createRef();

        this.state = {
            date: '',
            description: '',
            showNewDialogue: props.activities?.length == 0,
            error: false,
            showCal: false
        }
    }

    addNewActivity = ()  => {
        const act: Activity = {
            description: this.state.description,
            date: this.covertToLong(this.state.date),
            done: false
        }

        this.props.createActivity(act);
        this.setDate('');
        this.setDescription('');
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

    public setDate = (desc: string | Date) => {
        let d: string;
        if (desc instanceof Date) {
            d = format(desc, 'yyyy-MM-dd');
        } else {
            d = desc as string;
        }
        let err = false;
        if (desc !== '' && !isMatch(d , 'yyyy-MM-dd')) {
            err = true;
        }
        this.setState({date: d, error: err});
    }

    onHide = () => {
        this.setState({
            showCal: false
        });
    }

    renderFooter = () => {
        return (
            <div>
                <Button disabled={!this.state.date} label="Done" icon="pi pi-check" onClick={() =>  this.onHide()} autoFocus />
            </div>
        );
    }

    onShowCal = () => {
        this.setState({
            showCal: true
        });
    }
    render() {
        return (
            <div className="flex flex-row justify-content-end flex-wrap mt-6">
                <Toast ref={this.toastBL} position="bottom-left" />

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

                            <div className={'flex flex-row flex-nowrap'}>
                                <InputMask id="date"
                                            mask="9999-99-99"
                                            slotChar="yyyy-mm-dd"
                                            value={this.state.date}
                                            className={classNames({
                                                'w-full': true,
                                                'p-invalid': this.state.error,
                                                'no-round-border-right': true
                                            })}
                                            onChange={(e) => this.setDate(e.value)}/>
                                <Button  className={'no-round-border-left'}
                                         icon="pi pi-external-link"
                                         onClick={() => this.onShowCal()}/>
                                <Dialog header="Header" visible={this.state.showCal}
                                        maximizable
                                        modal
                                        style={{width: '50vw'}}
                                        footer={this.renderFooter()}
                                        onHide={() => this.onHide()}>
                                    <Calendar id="icon"
                                              value={new Date(this.covertToLong(this.state.date))}
                                              inline={true}
                                              dateFormat="yy-mm-dd"
                                              onChange={(e) => this.setDate(e.value as Date)}
                                              className={'w-full'}/>
                                </Dialog>
                            </div>

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
