import React, { useState } from 'react';

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

export default function connect(View) {
  function getTabs() {
    return execute('SELECT type, name FROM Tab;')[0]
      .data
      .map((tab) => ({ type: tab[0], name: tab[1] }));
  }

  return () => {
    if (!db) load();

    const [tabs, setTabs] = useState(getTabs());

    function addTab({ type, name }) {
      if (tabs.filter((tab) => tab.type === type && tab.name === name).length > 0) {
        window.alert(`${type}/${name} Already exists`);

        return;
      }

      execute(`INSERT INTO Tab VALUES (${type}, ${name});`);

      setTabs(getTabs());
    }

    function deleteTab({ type, name }) {
      execute(`DELETE FROM Tab WHERE type = "${type}" AND name = "${name}";`);

      setTabs(getTabs());
    }

    return (
      <View
        tabs={tabs}
        addTab={addTab}
        deleteTab={deleteTab}
      />
    );
  };
}
