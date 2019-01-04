import React, { Component } from 'react';
import requireAuth from './requireAuth';

const Dashboard = (props) => {
  return (
    <div>
      dashboard
    </div>
  );
};

export default requireAuth(Dashboard);
