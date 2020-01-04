import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import styled from 'styled-components';

import Main from './components/Main';
import AuthProvider from './context/authProvider';

const Root = styled.div`

`

function App() {
  return (
    <Root>
    <Router>
    <AuthProvider>
      <Main />
    </AuthProvider>
    </Router>
    </Root>
  );
}

export default App;
