import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { 
  HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <App>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signin" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
        </App>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
