import React, { useState } from 'react';
import styled from 'styled-components';

import color from '../styles/color';

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 500px;
  border: 0;
  background-color: ${color.consoleBg};
  color: white;
  font-size: 20px;
  font-family: consolas;
`;

const Code = styled.code`
  display: block;
  font-family: consolas;
`;

const InputBlock = styled.div`
  display: flex;
`;

const Input = styled.textarea`
  padding: 0 0 0 10px;
  background-color: transparent;
  border: none;
  font-family: consolas;
  font-size: 20px;
  color: white;
  outline: none;
  width: calc(100% - 30px);
`;

export default function Console() {
  const [query, setQuery] = useState('SELECT * FROM TableA;');

  const onChange = (e) => setQuery(e.target.value);
  const onKeyUp = (e) => {
    if (e.key === 'Enter' && query.includes(';')) {
      window.alert('execute query!');

      setQuery('');
    }
  };

  return (
    <Container>
      <Code>SELECT * FROM TableA;</Code>
      <InputBlock>
        <span>$</span>
        <Input
          autoFocus
          rows="20"
          value={query}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </InputBlock>
    </Container>
  );
}
