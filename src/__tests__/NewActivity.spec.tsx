import {render} from '@testing-library/react';
import NewActivity from "../components/NewActivity";
import {create, ReactTestInstance} from "react-test-renderer";
import {Activity} from "../generated/api";


describe('<NewActivity>', function() {
    it('should render without throwing an error', function() {
        function s() {
        }
        const container = create(<NewActivity  createActivity={s}/>);
        let instance = container.getInstance();
        expect({
            date: '',
            description: '',
            showNewDialogue: false
        }).toEqual(instance.state);
    });

    it('should open the dialogue on toggle', function() {
        function s() {
        }
        const container = create(<NewActivity  createActivity={s}/>);
        const instance: NewActivity = container.getInstance();

        expect(container.root.findAllByProps({id: "newActivityDialogue"}).length).toEqual(0);

        instance.toggle();

        expect({
            date: '',
            description: '',
            showNewDialogue: true
        }).toEqual(instance.state);

        expect(container.root.findAllByProps({id: "newActivityDialogue"}).length).toEqual(1);

    });

    it('should create a new activity', function() {
        let exp: Activity = undefined;
        function s(act: Activity) {
            exp = act;
        }
        const container = create(<NewActivity  createActivity={s}/>);
        const instance: NewActivity = container.getInstance();
        instance.setDate("1111-22-22");
        instance.setDescription("test");

        instance.toggle();
        instance.addNewActivity();

        expect({
            date: '1111-22-22',
            description: 'test',
            showNewDialogue: true
        }).toEqual(instance.state);

        expect(exp.description).toEqual('test');



    });


});
