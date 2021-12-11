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


/**
 * the {@link NewActivity} properties
 */
type Props = {
    /**
     * trigger a create activity action. used to send a new activity to the server
     * @param activity the activity to be added
     */
    createActivity: (activity: Activity | any) => void,

    /**
     * the progress info, injected from the NewActivity container
     */
    progress: boolean,

    /**
     * the error info, injected from the NewActivity container
     */
    communicationError: any

    /**
     * the activities list, injected from the NewActivity container
     */
    activities: Activity[],
}


/**
 * The internal component state.
 */
type NewActivityState = {
    date: string,
    description: string,
    showNewDialogue: boolean,
    error: boolean,
    showCal: boolean
}

export class NewActivity extends React.Component<Props, NewActivityState> {
    toastBL: any;


    /**
     * Lifecycle, used for rendering the errors.
     */
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

    /**
     * Add a new activity
     */
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


    /**
     * Convert a string into a long
     */
    covertToLong = (date: string) => {
        return Date.parse(date);
    }


    /**
     * Toggles the show new activity dialogue flag
     */
    toggle = () =>  {
        let prevState: boolean = this.state.showNewDialogue;
        this.setState({
            showNewDialogue: !prevState
        });
    }

    /**
     * set a description
     * @param desc the activity description to be set into the internal state
     */
    setDescription = (desc: string) => {
        this.setState({
            description: desc
        });
    }

    /**
     * set a date
     * @param desc the activity date to be set into the internal state
     */
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

    /**
     * show/hide the calendar dialogue
     */
    setCalendarVisibility = (v: boolean) => {
        this.setState({
            showCal: v
        });
    }

    /**
     * Render the footer of the calendar dialogue
     */
    renderFooter = () => {
        return (
            <div>
                <Button
                    disabled={!this.state.date}
                    label="Done"
                    icon="pi pi-check"
                    className={'p-button-sm p-button-outlined'}
                    onClick={() =>  this.setCalendarVisibility(false)} autoFocus />
            </div>
        );
    }


    /**
     * render the calendar dialogue
     * @param touch true if the widget to be rendered must be optimized for the mobile
     */
    renderCalendar = (touch: boolean) => {
        return (
            <Calendar id="icon"
                      value={new Date(this.covertToLong(this.state.date))}
                      touchUI={touch}
                      inline={!touch}
                      dateFormat="yy-mm-dd"
                      onChange={(e) => this.setDate(e.value as Date)}
                      className={classNames({
                          'w-full': true,
                          'md:hidden': touch
                      })
                  }/>
        );
    }

    render() {
        return (
            <div className="flex flex-row justify-content-end flex-wrap mt-6">
                <Toast ref={this.toastBL} position="bottom-left" />

                { !this.state.showNewDialogue &&
                <Button id="open-new-activity-dialogue"
                        label="New"
                        className="w-full p-button-sm mb-2 p-button-outlined p-button-secondary"
                        onClick={this.toggle}/>
                }

                {
                    this.state.showNewDialogue &&
                    <div id="newActivityDialogue" className="shadow-2 p-2 border-round w-full">
                        <div className={'flex flex-nowrap justify-content-between'}>
                            <h3 className="float-right">Add Task</h3>
                            <Button icon="pi pi-angle-up"
                                    className="p-button-rounded p-button-text my-auto"
                                    onClick={this.toggle}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="description">Description</label>
                            <InputText className="w-full" id="description"
                                       value={this.state.description}
                                       onChange={(e) => this.setDescription(e.target.value)}/>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="date">Date</label>

                            {this.renderCalendar(true)}

                            <div className={'flex flex-row flex-nowrap md:hide'}>
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
                                         icon="pi pi-calendar"
                                         onClick={() => this.setCalendarVisibility(true)}/>
                                <Dialog header="Header" visible={this.state.showCal}
                                        maximizable
                                        modal
                                        style={{width: '50vw'}}
                                        footer={this.renderFooter()}
                                        onHide={() => this.setCalendarVisibility(false)}>

                                    {this.renderCalendar(false)}
                                </Dialog>
                            </div>

                        </div>

                        <Button label="Save"
                                id={'save-activity'}
                                loading={this.props.progress}
                                disabled={!(!!this.state.description && !!this.state.date && !this.state.error)}
                                className="w-full p-button-sm mt-4 p-button-outlined p-button-primary"
                                onClick={this.addNewActivity}/>

                    </div>
                }
            </div>);
    }

}
