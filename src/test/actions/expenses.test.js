import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addExpense, startAddExpense, startEditExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytest'
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt }
    });

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense : {
            id: '123abc'
        }
    });
});

// test('should fetch expense from the db', (done) => {
//     const store = createMockStore({auth: { uid }});
//     const id = expenses[0].id;
//     store.dispatch(startRemoveExpense({ id })).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'REMOVE_EXPENSE',
//             expense: {
//                 id
//             }
//         });
//         return database.ref(`users/${uid}/expenses/${id}`).once('value');
//     }).then((snapshot) => {
//         expect(snapshot.val()).toBeFalsy();
//         done();
//     });
// });

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'new value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new value'
        }
    });
});

// test('should edit expense from db', (done) => {
//     const store = createMockStore({ auth: { uid }});
//     const id = expenses[0].id
//     const updates = {
//         description: 'haha',
//     };
//
//     store.dispatch(startEditExpense( id, updates )).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'EDIT_EXPENSE',
//             id,
//             updates
//         });
//
//         return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
//     }).then((snapshot) => {
//             expect(snapshot.val().description).toEqual(updates.description);
//             done();
//     });
// });

test('should setup add expense action object with provided values', () => {
    const expenseData = expenses[2];

    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        },
    });
});

test('should add expense to db and store', (done) => {
    const store = createMockStore({auth: { uid }});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'this one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
    });
});

test('should add expense with defaults to db and store', (done) => {
    const store = createMockStore({auth: { uid }});
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                amount: 0,
                note: '',
                createdAt: 0
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
            expect(snapshot.val()).toEqual({
                description: '',
                amount: 0,
                note: '',
                createdAt: 0
            });
            done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from the db', (done) => {
    const store = createMockStore({ auth: { uid }});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
