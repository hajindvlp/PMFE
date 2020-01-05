import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { 
  ProgressBar, 
  Button, 
  Fade,
  Form,
  Alert
} from 'react-bootstrap';
import { DateRange } from 'react-date-range';

import {setUserData} from '../api/user';

import '../assets/style/dashboard.css';
import logo from '../assets/image/Logo.png';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    let authorized = localStorage.getItem('authorized');
    let token = localStorage.getItem('token');

    this.state = {
      redirect: 'none',
      token: token,
      userData: {},
    }

    if(authorized !== "true") this.state.redirect = "/login";
  }

  componentWillMount() {
    setUserData(this.state.token, (status, data, err) => {
      if(status === 200) this.setState({userData: data});
      else console.log(err);
    })
  }

  render() {
    if(this.state.redirect !== 'none') {
      return <Redirect to={this.state.redirect} />
    } else {
      return (
        <div className="Wrapper">
          <Header name={this.state.userData.Name} />
          <Body user={this.state.userData}/>
        </div>
      )
    }
  }
}

function Header(props) {
  let name = props.name;

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="name">
        {name}
      </div>
    </div>
  )
}

function Body(props) {
  return(
    <div className="body">
      <Tasks tasks={props.user.Tasks}/>
      <Notification notifications={props.user.notification}/>
    </div>
  )
}

function Tasks(props) {
  let tasks = props.tasks;
  let tasksContent = <></>;

  if(tasks === undefined || tasks.length === 0) {
    tasksContent = <>No Task</>;
  } else {
    for(const task of tasks) {
      tasksContent = (<>
        {tasksContent}
        <div className="card">
          <div className="header"> 
            <div className="title">{task.title}</div>
            <div className="date">{task.start} ~ {task.end} </div>
          </div>
          <ProgressBar animated now={Math.floor(task.complete*100)} label={`${task.complete*100}%`} />
        </div>
      </>)
    }
  }
  
  return (
    <div className="indic tasks">
      <h1>Tasks</h1>
      <TaskForm />
      {tasksContent}
    </div>
  )
}

function TaskForm() {
  const [open, setOpen] = useState(false);
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  return (
    <div className="taskform">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="button"
      >
        Add New Task !
      </Button>
      <Fade in={open} className="collapse">
      <div className="card">
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" />
          </Form.Group>
          <Form.Group controlId="formDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Description of this Task" />
          </Form.Group>
          <DateRange ranges={[selectionRange]} moveRangeOnFirstSelection={false}/>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      </Fade>
    </div>
  );
}

function Notification(props) {
  let ntfcs = props.notifications;
  let ntfContent = <></>

  if(ntfcs === undefined || ntfcs.length === 0) {
    ntfContent = (
      <Alert variant="success">
        <p>No Notifications!!</p>
      </Alert>
    );
  } else {
    for(const ntf of ntfcs) {
      ntfContent = <>
        {ntfContent}
        <Ntfc ntfc={ntf}/>
      </>
    }
    return (
      <div className="indic notifications">
        <h1>Notifications</h1>
        {ntfContent}
      </div>
    );
  }

  function Ntfc(props) {
    const [show, setShow] = useState(true);
    let ntf = props.ntfc;
    console.log(ntf);
    if(show) {
      return (
        <Alert variant="info" onClose={() => setShow(false)} dismissible>
          <p>{ntf.message}</p>
        </Alert>
      )
    } else {
      return <></>
    }
  }

  return (
    <div className="indic notifications">
      <h1>Notifications</h1>
    </div>
  )
}