import {render} from '@testing-library/react';
import NewActivity from "../components/NewActivity";
import {create, ReactTestInstance} from "react-test-renderer";
import {Activity} from "../generated/api";


describe('<NewActivity>', function() {
    it('should render without throwing an error', function() {
        function s() {
        }
        const container = create(<NewActivity  createActivity={s}/>);
        expect(container.root).not.toBeNull();
    });

    it('should set error in case of invalid date', function() {
        function s() {
        }
        const container = create(<NewActivity  createActivity={s}/>);
        expect(container.root).not.toBeNull();
        const instance: NewActivity = container.getInstance();
        instance.setDate('9999-99-192');

        expect({
            date: '9999-99-192',
            description: '',
            showNewDialogue: false,
            error: true,

        }).toEqual(instance.state);


    });

    it('should open the dialogue on toggle', function() {
        function s() {
        }
        const container = create(<NewActivity  createActivity={s}/>);

        expect(container.root.findAllByProps({id: "newActivityDialogue"}).length).toEqual(0);

        const button = container.root.findByProps({id: "open-new-activity-dialogue"});
        button.props.onClick();

        expect(container.root.findAllByProps({id: "newActivityDialogue"}).length).toEqual(1);

    });

    it('should create a new activity', function() {
        let exp: Activity = undefined;
        function s(act: Activity) {
            exp = act;
        }
        const container = create(<NewActivity  createActivity={s}/>);
        const instance: NewActivity = container.getInstance();
        instance.setDate("1979-08-27");
        instance.setDescription("test");

        instance.toggle();
        instance.addNewActivity();

        expect({
            date: '1979-08-27',
            description: 'test',
            showNewDialogue: true,
            error: false,

        }).toEqual(instance.state);

        expect(exp.description).toEqual('test');
        expect(exp.date).toEqual(304560000000);

    });


});
