import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import ExpenseListItem from './ExpenseListItem'
import selectVisibleExpenses from '../selectors/expenses';
import selectExpensesSum from '../selectors/expenses-total';


export const ExpenseSummary = (props) => (
    <div>
        {props.expenses && props.expenses.length > 0 &&
            <p>
                Viewing {props.expenses.length} {props.expenses.length === 1 ? 'expense' : 'expenses'} for a total of {numeral(props.sum / 100).format('$0,0.00')}
            </p>
        }
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selectVisibleExpenses(state.expenses, state.filters),
        sum: selectExpensesSum(selectVisibleExpenses(state.expenses, state.filters))
    }
}

export default connect(mapStateToProps)(ExpenseSummary);
