import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { 
  Link } from 'react-router-dom';
import currentUser from '../queries/currentUser';
import logout from '../mutations/logout';

class Header extends Component {
  async onLogoutClick() {
    const user = await this.props.mutate({
      refetchQueries: [{query: currentUser}]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if(loading) {
      return null;
    } else if(user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/signin'>Signin</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link className='brand-logo left' to='/'>Home</Link>
          <ul className='right'>
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default compose(graphql(currentUser), graphql(logout))(Header);
