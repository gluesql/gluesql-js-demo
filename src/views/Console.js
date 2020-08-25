import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import styled from 'styled-components';

import connect, { getLogs, addLog } from '../manager';
import color from '../styles/color';

const Container = styled.div`
  padding: 10px;
  width: 100%;
  height: calc(100vh - 250px);
  border: 0;
  background-color: ${color.console.bg};
  color: ${color.console.fg};
  font-size: 20px;
  font-family: consolas;
  overflow-y: scroll;
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
  color: ${color.console.fg};
  outline: none;
  width: calc(100% - 30px);
`;

const Blue = styled.span`
  color: #7af;
`;

function Console({ db, activeTab }) {
  if (!activeTab) return <Container />;

  const { type, name } = activeTab;
  const [query, setQuery] = useState('');
  const [logs, setLogs] = useState([]);
  const input = useRef(null);

  useEffect(() => {
    setQuery('');
    setLogs(getLogs(activeTab));

    input.current.focus();
  }, [activeTab]);

  const onChange = (e) => setQuery(e.target.value);
  const onKeyUp = (e) => {
    if (e.key === 'Enter' && query.includes(';')) {
      let result;

      try {
        result = db.execute(query);
      } catch (error) {
        result = error;
      }

      addLog({
        type, name, query, result,
      });
      setLogs(getLogs(activeTab));
      setQuery('');
    }
  };

  return (
    <Container>
      <Code>
        [Storage]
        <br />
        {`Type: ${type}`}
        <br />
        {`Name: ${name}`}
        <br />
        <br />
      </Code>
      { logs.map((log, i) => (
        <Fragment key={`${name}-${i}`}>
          <Code>
            <Blue>[Run]</Blue>
            <br />
            {`> ${log.query}`}
            <br />
            <Blue>[Result]</Blue>
            <br />
            {JSON.stringify(log.result)}
            <br />
            <br />
          </Code>
        </Fragment>
      )) }
      <InputBlock>
        <span>$</span>
        <Input
          ref={input}
          autoFocus
          rows="10"
          value={query}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </InputBlock>
    </Container>
  );
}

export default connect(Console);
