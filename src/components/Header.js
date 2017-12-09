import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink activeClassName="is-active" exact={true} to="/">Go Home!</NavLink>
        <NavLink activeClassName="is-active" to="/create">add expense</NavLink>
        <NavLink activeClassName="is-active" to="/edit">edit expense</NavLink>
        <NavLink activeClassName="is-active" to="/help">help</NavLink>

    </header>
)

export default Header;
