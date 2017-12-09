import React from 'react'
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expense from '../fixtures/expenses'
import moment from 'moment';

test('should render expense form', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expense[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    const form = wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'new description';
    const wrapper = shallow(<ExpenseForm />);

    const form = wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set description on input change', () => {
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm />);

    const form = wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid', () => {
    const value = '10000'
    const wrapper = shallow(<ExpenseForm />);

    const form = wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid', () => {
    const value = 'lallalala'
    const wrapper = shallow(<ExpenseForm />);

    const form = wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expense[1]} onSubmit={onSubmitSpy} />)
        const form = wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expense[1].description,
        note: expense[1].note,
        amount: expense[1].amount,
        createdAt: expense[1].createdAt,
    });
});

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on focus change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
    expect(wrapper.state('calendarFocused')).toEqual(true);

});
