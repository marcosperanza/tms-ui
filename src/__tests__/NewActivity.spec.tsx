import React, {ReactElement} from "react";
import {Activity} from "../generated/api";
import {createRenderer} from "react-test-renderer/shallow";
import {NewActivity} from "../components/NewActivity";


let instance: NewActivity;
let container: ReactElement;
let callBack: (a: Activity) => {};

describe('NewActivity suite', () => {
    beforeEach(() => {
        callBack = jest.fn();
        const renderer = createRenderer()
        renderer.render(<NewActivity  createActivity={callBack} progress={false}/>);
        container = renderer.getRenderOutput();
        instance = renderer.getMountedInstance();
    });

    it('should render without throwing an error', function() {
        expect(container).not.toBeNull();
        expect(instance).not.toBeNull();
    });

    it('should set error in case of invalid date', function() {
        expect(container).not.toBeNull();

        instance.setDate('9999-99-192');

        expect({
            date: '9999-99-192',
            description: '',
            showNewDialogue: false,
            error: true,

        }).toEqual(instance.state);

    });


    it('should create a new activity', function() {
        instance.setDate("1979-08-27");
        instance.setDescription("test");

        instance.toggle();
        instance.addNewActivity();

        expect(callBack).toHaveBeenCalledWith({
            date: 304560000000,
            description: "test",
            done: false
        });

    });

});

