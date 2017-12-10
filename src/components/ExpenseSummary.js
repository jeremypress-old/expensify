import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import ExpenseListItem from './ExpenseListItem'
import selectVisibleExpenses from '../selectors/expenses';
import selectExpensesSum from '../selectors/expenses-total';


export const ExpenseSummary = ({expensesCount, sum}) => (
    <div>
        {expensesCount > 0 &&
            <h1>
                Viewing {expensesCount} {expensesCount=== 1 ? 'expense' : 'expenses'} for a total of {numeral(sum / 100).format('$0,0.00')}
            </h1>
        }
    </div>
)

const mapStateToProps = (state) => {
    const visibleExpenses = selectVisibleExpenses(state.expenses, state.filters)
    return {
        expensesCount: visibleExpenses.length,
        sum: selectExpensesSum(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary);
