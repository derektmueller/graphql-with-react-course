import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/login';
import { graphql } from 'react-apollo';
import currentUser from '../queries/currentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {errors: []};
  }

  async onSubmit({email, password}) {
    try {
      await this.props.mutate({
        variables: {email, password},
        refetchQueries: [{query: currentUser}],
        awaitRefetchQueries: true
      });
      this.props.history.push('/');
    } catch(e) {
      const errors = e.graphQLErrors.map(e => e.message);
      this.setState({errors});
    }
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm 
          errors={this.state.errors} 
          onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
