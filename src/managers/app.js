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

    CREATE TABLE Log (
      type TEXT,
      name TEXT,
      query TEXT,
      result TEXT
    );
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

const encode = (json) => btoa(JSON.stringify(json));
const decode = (value) => JSON.parse(atob(value));

export function getLogs({ type, name }) {
  return execute(`SELECT query, result FROM Log WHERE type = "${type}" AND name = "${name}";`)[0]
    .data
    .map(([query, result]) => ({ query: atob(query), result: decode(result) }));
}

export function addLog({
  type, name, query, result,
}) {
  const sql = `INSERT INTO Log VALUES (
    "${type}", "${name}", "${btoa(query)}", "${encode(result)}"
  );`;

  execute(sql);
}

class DbStore {
  constructor() {
    this.dbMap = {};
  }

  static getKey({ type, name }) {
    return `${type}-${name}`;
  }

  get(tab) {
    const key = DbStore.getKey(tab);
    let tabDb = this.dbMap[key];

    if (!tabDb) {
      tabDb = getGlue(tab.type, tab.name);

      this.dbMap[key] = tabDb;
    }

    return this.dbMap[key];
  }

  delete(tab) {
    const key = DbStore.getKey(tab);

    delete this.dbMap[key];
  }
}

const dbStore = new DbStore();
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
    }, []);

    function addTab(tab) {
      const { type, name } = tab;

      if (hasTab(tabs, tab)) {
        window.alert(`${type}/${name} Already exists`);

        return;
      }

      execute(`INSERT INTO Tab VALUES ("${type}", "${name}");`);

      const newTabs = getTabs();
      const newTab = newTabs[newTabs.length - 1];

      update(newTabs, newTab);
    }

    function deleteTab(tab) {
      const { type, name } = tab;
      execute(`DELETE FROM Log WHERE type = "${type}" AND name = "${name}";`);
      execute(`DELETE FROM Tab WHERE type = "${type}" AND name = "${name}";`);

      const newTabs = getTabs();
      const newTab = hasTab(newTabs, activeTab) ? activeTab : newTabs[0];

      dbStore.delete(tab);
      update(newTabs, newTab);
    }

    function selectTab(tab) {
      update(getTabs(), tab);
    }

    return (
      <View
        db={activeTab ? dbStore.get(activeTab) : null}
        activeTab={activeTab}
        tabs={tabs}
        addTab={addTab}
        deleteTab={deleteTab}
        selectTab={selectTab}
      />
    );
  };
}
