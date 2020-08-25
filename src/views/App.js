import React from 'react';
import styled from 'styled-components';

import connect from '../manager';
import Tabs from './Tabs';
import Console from './Console';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: min(1200px, 95vw);
`;

function App() {
  return (
    <Root>
      <Container>
        <h1>GlueSQL Web Demo</h1>
        <Tabs />
        <Console />
      </Container>
    </Root>
  );
}

export default connect(App);
