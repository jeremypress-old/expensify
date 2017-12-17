import authReducer from '../../reducers/auth';

test('should set the login state', () => {
        const state = authReducer(undefined, { type: 'LOGIN', uid: 'id'});
        expect(state).toEqual({
            uid: 'id'
        });
});

test('should set the logout state', () => {
        const state = authReducer(undefined, { type: 'LOGOUT'});
        expect(state).toEqual({});
});
