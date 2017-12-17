import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink activeClassName="is-active" exact={true} to="/">Go Home!</NavLink>
        <NavLink activeClassName="is-active" to="/create">add expense</NavLink>
        <NavLink activeClassName="is-active" to="/edit">edit expense</NavLink>
        <NavLink activeClassName="is-active" to="/help">help</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
