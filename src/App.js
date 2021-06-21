import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import Create from './components/Create';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <ToDoList />
                </Route>
                <Route path="/create">
                    <Create />
                </Route>
                <Route path="*">
                    <p>404</p>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
