import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import MyRoutes from './routes';

ReactDOM.render(
  <React.StrictMode>
	<MyRoutes/>
  </React.StrictMode>,
  document.getElementById('root')
);
