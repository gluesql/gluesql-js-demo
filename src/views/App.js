import React from 'react';

import connect from '../managers/app';

function App({ tabs, addTab, deleteTab }) {
  const add = () => {
    const name = window.prompt('name?');

    addTab({ type: 'memory', name });
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={add}>
        Add!
      </button>
      <ul>
        { tabs.map((tab) => (
          <li key={`${tab.type}-${tab.name}`}>
            <span>{tab.name}</span>
            <button
              type="button"
              onClick={() => deleteTab(tab)}
            >
              Delete
            </button>
          </li>
        )) }
      </ul>
    </div>
  );
}

export default connect(App);
