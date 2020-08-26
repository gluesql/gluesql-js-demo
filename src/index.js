import React from 'react';
import { render } from 'react-dom';

import { load } from './glue';
import App from './views/App';
import Connect from './views/Connect';

async function main() {
  await load();

  render(
    <App />,
    document.querySelector('#root'),
  );

  render(
    <Connect />,
    document.querySelector('#popup'),
  );
}

main();
