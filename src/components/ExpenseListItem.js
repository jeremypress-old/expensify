import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const ExpenseListItem = ({ description, amount, createdAt, id, dispatch, history},) => (
    <div>
        <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
);


export default ExpenseListItem
