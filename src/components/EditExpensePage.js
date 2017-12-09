import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
    render() {
        return (
            onSubmit = (expense) => {
                this.props.editExpense(props.expense.id, expense);
                this.props.history.push('/')
            }

            onClick = () => {
                this.props.removeExpense({ id: props.expense.id });
                this.props.history.push('/');
            }

            render() {
                return (
                    <div>
                        <ExpenseForm
                            expense={props.expense}
                            onSubmit={this.onSubmit}
                        />
                    <button onClick={this.onClick}>Remove</button>
                    </div>
                )
            }

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expense.find((expense) => expense.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        editExpense: (id, expense) => dispatch(editExpense(id, expense)),
        removeExpense: (data) => dispatch(removeExpense(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
