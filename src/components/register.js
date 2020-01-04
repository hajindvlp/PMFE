import React, {Component} from 'react';
import styled from 'styled-components';

import logo from '../assets/image/Logo.png';

import {register} from '../api/auth';
import { Redirect } from 'react-router-dom';

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
const RegisterContainer = styled.div`
  // filter: blur(8px);
`
const RegisterId = styled.div`
  padding: 10px;
`
const RegisterPw = styled.div`
  padding: 10px;
`
const RegisterName = styled.div`
  padding: 10px;
`
const RegisterButton = styled.input`
  margin: 10px;
`
const RegisterForm = styled.form`
  margin: auto;
  text-align: center;
  border: 3px solid grey;
  background-color: rgba(255, 255, 255, 0);
`

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      pw: '',
      name: '',
      redirect: 'none',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let {id, pw, name} = this.state;
    register(name, id, pw, (status, err) => {
      if(status === 200) {
        alert("Success");
        this.setState({redirect: "/login"});
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
			return <Redirect to={this.state.redirect} />
		} else {
			return (
				<Background>
					<Container>
						<LogoImg src={logo} alt="Logo"/>
						<RegisterContainer>
							<RegisterForm onSubmit={this.handleSubmit}>
								<h1>Welcome</h1>
								<RegisterName><input type="text"     name="name" onChange={this.handleChange} /> </RegisterName>
								<RegisterId>  <input type="text"     name="id"   onChange={this.handleChange} /> </RegisterId>
								<RegisterPw>  <input type="password" name="pw"   onChange={this.handleChange} /> </RegisterPw>
								<RegisterButton type="submit" value="Submit" className="Submit" />
							</RegisterForm>
						</RegisterContainer>
					</Container>
				</Background>
			)
		}
  }
}