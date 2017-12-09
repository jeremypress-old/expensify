import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setEndDate = jest.fn();
    setStartDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
    />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({'filters': altFilters});
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'new text';
    wrapper.setProps({'filters': altFilters});
    wrapper.find('input').simulate('change', { target: { value }});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.find('select').simulate('change', { target: { value }});
    expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', { target: { value }});
    expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date changes', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate: '1000', endDate: '20000'});
    expect(setStartDate).toHaveBeenLastCalledWith('1000');
    expect(setEndDate).toHaveBeenLastCalledWith('20000');
});

test('should handle date focus changes', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')(true);
    expect(wrapper.state('calendarFocused')).toBe(true);
});
