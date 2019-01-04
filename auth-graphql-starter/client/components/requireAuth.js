import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUser from '../queries/currentUser';
import {Redirect} from 'react-router-dom';

export default function requireAuth(Component) {
  return graphql(currentUser)(props => {
    const {loading, user} = props.data;

    if(loading) {
      return <div>Loading...</div>;
    } else if(!user) {
      return (
        <Redirect to='/signin' />
      )
    } else {
      return <Component {...props} />;
    }
  });
};
