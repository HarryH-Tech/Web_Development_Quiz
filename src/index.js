import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';


import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Import components
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const Root = () => {
	return (
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
			</Switch>
	)
}



ReactDOM.render(
		<Router>
			<Root />
		</Router>, document.getElementById('root'));
