import {login, logout } from '../../actions/auth';


test('should correctly create the login action', () => {
    const action = login('id');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'id'
    });
});

test('should correctly create the logout action', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT',
    });
});
