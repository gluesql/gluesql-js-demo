import React from 'react';
import styled from 'styled-components';

import connect from '../managers/app';
import color from '../styles/color';

const Container = styled.ol`
  margin: 0;
  padding-inline-start: 0;
  width: 100%;
  list-style: none;
  display: flex;
`;

const Tab = styled.li`
  margin: 0 3px 0 0;
  padding: 2px;
  border-style: solid;
  border-color: ${color.border};
  border-width: 1px 1px 0 1px;
  background-color: ${(props) => (props.selected ? color.tab.bgSelected : 'transparent')};
`;

const Button = styled.button`
  height: 45px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 22px;
  color: ${(props) => (props.selected ? color.tab.fgSelected : color.tab.fg)};
`;

const TabSelect = styled(Button)`
  padding: 0 20px;
  font-weight: 500;
`;

function Tabs({
  tabs, activeTab, deleteTab, selectTab, addTab,
}) {
  const add = () => {
    const name = window.prompt('name?');

    addTab({ type: 'memory', name });
  };

  return (
    <Container>
      { tabs.map((tab) => {
        const selected = tab.name === activeTab.name && tab.type === activeTab.type;

        return (
          <Tab key={`${tab.type}-${tab.name}`} selected={selected}>
            <TabSelect
              selected={selected}
              type="button"
              onClick={() => selectTab(tab)}
            >
              {tab.name}
            </TabSelect>
            <Button
              type="button"
              onClick={() => deleteTab(tab)}
            >
              <span role="img" aria-label="delete">❌</span>
            </Button>
          </Tab>
        );
      }) }

      <Tab>
        <Button type="button" onClick={add}>
          <span role="img" aria-label="connect">⚡</span>
        </Button>
      </Tab>
    </Container>
  );
}

export default connect(Tabs);
