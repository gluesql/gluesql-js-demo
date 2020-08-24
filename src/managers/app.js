import React, { useState, useEffect } from 'react';

import { getGlue } from '../glue';

let db;

function load() {
  db = getGlue('memory');

  db.execute(`
    CREATE TABLE Tab (
      type TEXT,
      name TEXT
    );

    INSERT INTO Tab VALUES ("memory", "Test");
    INSERT INTO Tab VALUES ("memory", "GlueGlue");
  `);
}

function execute(sql) {
  try {
    return db.execute(sql);
  } catch (e) {
    console.error(e);
    window.alert(JSON.stringify(e));

    return [];
  }
}

const tabsMap = {};
const activeTabMap = {};

export default function connect(View) {
  function getTabs() {
    return execute('SELECT type, name FROM Tab;')[0]
      .data
      .map((tab) => ({ type: tab[0], name: tab[1] }));
  }

  function hasTab(tabs, { type, name }) {
    return tabs.filter((tab) => tab.type === type && tab.name === name).length > 0;
  }

  function update(tabs, activeTab) {
    Object.values(tabsMap).forEach((setTabs) => setTabs(tabs));
    Object.values(activeTabMap).forEach((setActiveTab) => setActiveTab(activeTab));
  }

  return () => {
    if (!db) load();

    const [tabs, setTabs] = useState(getTabs());
    const [activeTab, setActiveTab] = useState(tabs[0]);

    useEffect(() => {
      tabsMap[View] = setTabs;
      activeTabMap[View] = setActiveTab;

      return () => {
        delete tabsMap[View];
        delete activeTabMap[View];
      };
    });

    function addTab(tab) {
      const { type, name } = tab;

      if (hasTab(tabs, tab)) {
        window.alert(`${type}/${name} Already exists`);

        return;
      }

      execute(`INSERT INTO Tab VALUES (${type}, ${name});`);

      const newTabs = getTabs();

      update(newTabs, newTabs[newTabs.length - 1]);
    }

    function deleteTab({ type, name }) {
      execute(`DELETE FROM Tab WHERE type = "${type}" AND name = "${name}";`);

      const newTabs = getTabs();
      const newTab = hasTab(newTabs, activeTab) ? activeTab : newTabs[0];

      update(newTabs, newTab);
    }

    function selectTab(tab) {
      update(getTabs(), tab);
    }

    return (
      <View
        tabs={tabs}
        activeTab={activeTab}
        addTab={addTab}
        deleteTab={deleteTab}
        selectTab={selectTab}
      />
    );
  };
}
