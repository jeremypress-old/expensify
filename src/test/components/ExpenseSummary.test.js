import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should render nothing with no expenses passed in', () => {
    const wrapper = shallow(<ExpenseSummary />);
    expect(wrapper).toMatchSnapshot();
});

test('should render one expense correctly ', () => {
    const wrapper = shallow(<ExpenseSummary expensesCount={1} sum={expenses[0].amount} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render multiple expenses correctly ', () => {
    const wrapper = shallow(<ExpenseSummary expensesCount={expenses.length} sum={expenses[0].amount + expenses[1].amount + expenses[2].amount}/>);
    expect(wrapper).toMatchSnapshot();
});
