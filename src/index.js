import React from 'react';
import { render } from 'react-dom';

import { load } from './glue';
import App from './views/App';

async function main() {
  await load();

  render(
    <App />,
    document.querySelector('#root'),
  );
}

main();
