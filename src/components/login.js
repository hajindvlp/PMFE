import React, {Component} from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';

import logo from '../assets/image/Logo.png';

import {auth} from '../api/auth';

const Background = styled.div`
  width: 100%;
  height: 100%;
`
const Container = styled.div`
  display: block;
  justify-content: center;
  max-width: 480px;
  margin: auto;
`
const LogoImg = styled.img`
  display: block;
  margin: auto;
  padding-top: 20px;
  margin-bottom: 50px;
`
const LoginContainer = styled.div`
  // filter: blur(8px);
`
const LoginId = styled.div`
  padding: 10px;
`
const LoginPw = styled.div`
  padding: 10px;
`
const LoginButton = styled.input`
  margin: 10px;
`
const LoginForm = styled.form`
  margin: auto;
  text-align: center;
  border: 3px solid grey;
  background-color: rgba(255, 255, 255, 0);
`

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      pw: '',
      redirect: 'none',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let {id, pw} = this.state;
    auth(id, pw, (status, token, err) => {
      if(status === 200) {
        localStorage.setItem('authorized', true);
        localStorage.setItem('token', token);

        alert("logged in");
        this.setState({redirect: '/'});
      } else if(err) {
        alert("fail");
      }
    })
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
        ...this.state,
        [evt.target.name]: value
    });
  }

  render() {
    if(this.state.redirect !== 'none') {
      return <Redirect to={this.state.redirect}/>
    } else {
      return (
        <Background>
          <Container>
            <LogoImg src={logo} alt="Logo"/>
            <LoginContainer>
              <LoginForm onSubmit={this.handleSubmit}>
                <h1>Welcome</h1>
                <LoginId><input type="text" name="id" onChange={this.handleChange} /></LoginId>
                <LoginPw><input type="password" name="pw" onChange={this.handleChange} /></LoginPw>
                <LoginButton type="submit" value="Submit" className="Submit" />
              </LoginForm>
            </LoginContainer>
          </Container>
        </Background>
      )
    }
  }
}