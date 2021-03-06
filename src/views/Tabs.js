import React from 'react';
import styled from 'styled-components';

import connect from '../manager';
import color from '../styles/color';
import { show } from './Connect';

const Container = styled.ol`
  margin: 0;
  padding-inline-start: 0;
  width: 100%;
  list-style: none;
  display: flex;
  overflow-x: auto;
`;

const Tab = styled.li`
  margin: 0 3px 0 0;
  padding: 2px;
  border-style: solid;
  border-color: ${color.border};
  border-width: 1px 1px 0 1px;
  background-color: ${(props) => (props.selected ? color.tab.bgSelected : 'transparent')};

  display: flex;
  align-items: center;
`;

const Button = styled.button`
  height: 60px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 22px;
  color: ${(props) => (props.selected ? color.tab.fgSelected : color.tab.fg)};
`;

const TabSelect = styled(Button)`
  padding: 7px 20px;
  font-weight: 500;

  display: flex;
  flex-direction: column;
`;

const TypeLabel = styled.small`
  font-weight: 400;
  font-size: 16px;
`;

function Tabs({
  tabs, activeTab, deleteTab, selectTab,
}) {
  return (
    <Container>
      { tabs.map((tab) => {
        const selected = activeTab && (
          tab.name === activeTab.name && tab.type === activeTab.type
        );

        return (
          <Tab key={`${tab.type}-${tab.name}`} selected={selected}>
            <TabSelect
              selected={selected}
              type="button"
              onClick={() => selectTab(tab)}
            >
              <TypeLabel>{`[${tab.type}]`}</TypeLabel>
              <div>{tab.name}</div>
            </TabSelect>
            <Button
              type="button"
              onClick={() => deleteTab(tab)}
            >
              <span style={{ color: 'red' }}>x</span>
            </Button>
          </Tab>
        );
      }) }
      <Tab>
        <Button type="button" onClick={show}>
          <span>New +</span>
        </Button>
      </Tab>
    </Container>
  );
}

export default connect(Tabs);
