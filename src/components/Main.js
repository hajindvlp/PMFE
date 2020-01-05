import React, {Component} from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch
} from 'react-router-dom';

import Login from './login';
import Register from './register';
import Dashboard from './dashboard';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    
`

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: 0,
    }
  }

  render() {
    return (
      <Wrapper>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register}/>
          <Route path="/" component={Dashboard}/>
        </Switch>
      </Wrapper>
    )
  }
}

export default Main;
