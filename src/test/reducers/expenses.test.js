import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
        const state = expensesReducer(undefined, { type: '@@INIT'});
        expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: expenses[1].id
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]])
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '-1'
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const expense = {
        id: '100',
        note: 'hi',
        description: 'ello'
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense])
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount: 100
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toEqual(100);
})

test('should not edit if expense not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '-1'
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})
