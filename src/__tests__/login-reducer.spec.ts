import activityReducer, {initialState} from "../store/login-reducer";


describe('login reducer', () => {

    it('should add a username', () => {
        let payload = 'user name';
        expect(
            activityReducer(undefined,  {type: "LOGIN_USERNAME", payload: payload})
        ).toEqual(
            {
                ...initialState,
                username: 'user name'
            }
        )
    })

})
