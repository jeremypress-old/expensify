import React from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )

    }

    onSubmit = (expense) => {
        this.props.onSubmit(expense)
        this.props.history.push('/')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (expense) => dispatch(addExpense(expenses))
    }
}

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
