import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../views/login';
import { Signup } from '../views/signup';

export function RegisterButton() {
  return (
    <Router>
      <Switch>
        <Route exact path="../views/login" component={Login} />
        <Route path="../views/signup" component={Signup} />
      </Switch>
    </Router>
  );
}