import activityReducer, {initialState} from "../store/error-reducer";


describe('error reducer', () => {

    it('should add a error', () => {
        let payload = {errorMessage: 'fake error'};
        expect(
            activityReducer(undefined,  {type: "ERROR", payload: payload})
        ).toEqual(
            {
                ...initialState,
                error: {errorMessage: 'fake error'},
            }
        )
    })

    it('should remove error on other actions', () => {
        expect(
            activityReducer(undefined,  {type: "SET_ACTIVITIES", payload: []})
        ).toEqual(
            {
                ...initialState,
                error: undefined,
            }
        )
    })

})
