import React from 'react';
import styled from 'styled-components';

import connect from '../managers/app';
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

function App({ addTab }) {
  const add = () => {
    const name = window.prompt('name?');

    addTab({ type: 'memory', name });
  };

  return (
    <Root>
      <Container>
        <h1>GlueSQL Web Demo</h1>
        <button type="button" onClick={add}>
          Add!
        </button>
        <Tabs />
        <Console />
      </Container>
    </Root>
  );
}

export default connect(App);
