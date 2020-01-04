import React, {Component} from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import {getUserData} from '../api/user';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    let authorized = localStorage.getItem('authorized');
    let token = localStorage.getItem('token');

    this.state = {
      redirect: 'none',
      token: token,
    }

    if(authorized !== "true") this.state.redirect = "/login";
  }

  render() {
    if(this.state.redirect !== 'none') {
      return <Redirect to={this.state.redirect} />
    } else {
      return (
        <Container>
          <Header token={this.state.token} />
        </Container>
      )
    }
  }
}

function Header(props) {
  let userData = getUserData(props.token);
  let name = userData.User.Name;
  console.log();

  return <>{name}</>
}