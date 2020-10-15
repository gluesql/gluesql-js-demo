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
  font-size: 16px;
  font-family: consolas, monospace;
  overflow-y: scroll;
`;

const Code = styled.pre`
  display: block;
  font-family: consolas, monospace;
`;

const InputBlock = styled.div`
  display: flex;
`;

const Input = styled.textarea`
  padding: 0 0 0 10px;
  background-color: transparent;
  border: none;
  font-family: consolas, monospace;
  font-size: 16px;
  color: ${color.console.fg};
  outline: none;
  width: calc(100% - 30px);
`;

const Label = styled.span`
  color: ${color.console.fgLabel};
`;

const Table = styled.table`
  margin-top: 5px;
  border-collapse: collapse;

  &, & tr, & td {
    border: 1px solid ${color.console.fgBorder};
  }

  & td {
    padding: 5px;
  }
`;

function print(message, key) {
  return (
    <Fragment key={key}>
      <span>{message}</span>
      <br />
    </Fragment>
  );
}

function display(log) {
  if (typeof log.result === 'string') {
    return print(log.result);
  } if (!Array.isArray(log.result)) {
    const key = Object.keys(log.result)[0];
    const message = `[${key} Error] ${JSON.stringify(log.result[key])}`;

    return print(message);
  }

  const messages = log.result.map((result, k) => {
    switch (result.query) {
      case 'CREATE':
      case 'DROP':
      case 'INSERT':
      case 'ALTER TABLE':
        return print(
          `[${result.query}] succeeded.`,
          `result-${k}`,
        );
      case 'DELETE':
      case 'UPDATE':
        return print(
          `[${result.query}] ${result.data} row(s) affected.`,
          `result-${k}`,
        );
      case 'SELECT':
        return (
          <Table key={`result-${k}`}>
            <tbody>
              { result.data.map((row, i) => (
                <tr key={`row-${i}`}>
                  { row.map((col, j) => (
                    <td key={`col-${i}-${j}`}>{ col }</td>
                  )) }
                </tr>
              )) }
            </tbody>
          </Table>
        );
      default:
        return print(
          JSON.stringify(result),
          `result-${k}`,
        );
    }
  });

  return <>{messages}</>;
}

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
        const rectified = query.replace(/;\s*$/, '');

        result = db.execute(rectified);
      } catch (error) {
        result = error;
      }

      addLog({
        type, name, query, result,
      });
      setLogs(getLogs(activeTab));
      setQuery('');

      input.current.focus();
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
            <Label>[Run]</Label>
            <br />
            {`> ${log.query}`}
            <br />
            <Label>[Result]</Label>
            <br />
            {display(log)}
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
