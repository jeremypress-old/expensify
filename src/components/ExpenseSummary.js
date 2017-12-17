import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import ExpenseListItem from './ExpenseListItem'
import selectVisibleExpenses from '../selectors/expenses';
import selectExpensesSum from '../selectors/expenses-total';


export const ExpenseSummary = ({expensesCount, sum}) => (
    <div className="page-header">
        <div className="content-container">
            {expensesCount > 0 &&
                <h1 className="page-header__title">
                    Viewing <span>{expensesCount}</span> {expensesCount=== 1 ? 'expense' : 'expenses'} for a total of <span>{numeral(sum / 100).format('$0,0.00')}</span>
                </h1>
            }
        <div className="page-header__action">
            <Link className="btn" to="/create">Add Expense</Link>
        </div>
        </div>
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
