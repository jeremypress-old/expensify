import { createStore } from 'redux';

// Action generators - return action objects
const incrementCount = ({ incrementBy = 1 }) => {
        return {
            type: 'INCREMENT',
            incrementBy
        }
};

const decrementCount = ({ decrementBy = 1 }) => {
    return {
        type: 'DECREMENT',
        decrementBy
    }
};

const resetCount = () => {
    return {
        type: 'RESET'
    }
};

const setCount = ({ count }) => {
    return {
        type: 'SET',
        count
    }
};

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const { incrementBy = 1} = action;
            return {
                count: state.count + incrementBy
            }
        case 'DECREMENT':
        const { decrementBy = 1} = action;
            return {
                count: state.count - decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
};


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCount({ incrementBy: 7 }));

store.dispatch(decrementCount({ decrementBy: 5 }));

store.dispatch(setCount({ count: 500 }));

store.dispatch(resetCount());

unsubscribe();
