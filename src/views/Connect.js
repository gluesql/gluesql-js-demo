import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import connect from '../manager';
import color from '../styles/color';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${color.popup.bgOverlay};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;

  & p {
    margin: 30px 0 5px 0;
    padding: 0;
    font-size: 26px;
  }
`;

const Popup = styled.div`
  width: min(400px, 90vw);
  padding: 10px 30px 30px 30px;

  background-color: ${color.popup.bg};
`;

const NameInput = styled.input`
  width: min(100%, 300px);
  height: 45px;
  font-size: 24px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;

  & > label {
    padding: 5px 0;
  }

  & span {
    padding-left: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  & button {
    margin: 30px 10px 10px 10px;
    padding: 10px 20px;
    font-size: 24px;
    background-color: transparent;
    border: 1px solid ${color.border};
    cursor: pointer;
  }
`;

let open;
let close = () => {};

export async function show() {
  open();

  return new Promise((resolve) => {
    close = resolve;
  });
}

function Connect({ addTab }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('memory');
  const input = useRef(null);

  useEffect(() => {
    if (!visible) { return; }

    setName('');
    input.current.focus();
  }, [visible]);

  open = () => { setVisible(true); };

  const check = (storageType) => { setType(storageType); };

  const hide = () => {
    setVisible(false);

    close();
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!name) {
      window.alert('Please fill the name field');

      return;
    }

    if (await addTab({ name, type })) {
      setVisible(false);

      close();
    }
  };

  return visible && (
    <Container>
      <Popup>
        <h2>
          <span role="img" aria-label="connect">⚡</span>
          {' New Connection'}
        </h2>
        <form onSubmit={submit}>
          <p>Database name</p>
          <NameInput
            ref={input}
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
          />
          <p>Storage type</p>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="storage"
                value="memory"
                checked={type === 'memory'}
                onChange={() => { check('memory'); }}
              />
              <span>memory</span>
            </label>
            <label>
              <input
                type="radio"
                name="storage"
                value="localstorage"
                checked={type === 'localstorage'}
                onChange={() => { check('localstorage'); }}
              />
              <span>localStorage</span>
            </label>
            <label>
              <input
                type="radio"
                name="storage"
                value="sessionstorage"
                checked={type === 'sessionstorage'}
                onChange={() => { check('sessionstorage'); }}
              />
              <span>sessionStorage</span>
            </label>
          </RadioGroup>
          <ButtonGroup>
            <button type="submit">Create</button>
            <button type="button" onClick={hide}>Cancel</button>
          </ButtonGroup>
        </form>
      </Popup>
    </Container>
  );
}

export default connect(Connect);
