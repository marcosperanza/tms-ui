import React from 'react';
import {Button} from "primereact/button";


/**
 * the {@link Header} properties
 */
type Props = {
    login: () => void;
    username: string;
}

type HeaderState = {
}

export class Header extends React.Component<Props, HeaderState> {

    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="header flex flex-row justify-content-between">
                <span className={'font-bold text-xl ml-2 my-auto title'}>Task Management System</span>

                <div className={'flex flex-row login my-auto'}>
                    <span className={'my-auto'}>{this.props.username}</span>
                    <Button icon="pi pi-user"
                            disabled={ this.props.username !== '' && this.props.username !== 'guest'}
                            className="p-button-rounded p-button-info p-button-text login"  onClick={this.props.login}/>
                </div>
            </div>);
    }

}

