// Get expenses sum
export default (expenses) => {
    if (expenses.length === 0) {
        return 0;
    }

    return expenses.map((expense) => {
        return expense.amount;
    }).reduce((a, b) => {
        return a + b;
    });
};
