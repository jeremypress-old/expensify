import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
}

export const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
});

export const startRemoveExpense = ({ id }) => {
    return (dispatch) => {
        return database.ref('expenses').child(id).remove().then((snapshot) => {
            dispatch(removeExpense({ id }));
        });
    };
};

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref('expenses').child(id).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// START_SET_EXPENSES
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log(uid);
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            let expenses = [];
            const val = snapshot.forEach((item) => {
                expenses.push({
                    id: item.key,
                    ...item.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    };
}
