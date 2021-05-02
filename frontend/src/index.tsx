import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* Main entry point of the website. Creates an App component that we defined in App.tsx
 */

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
