import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ToDoList from './components/ToDoList';
import Create from './components/Create';

const useStyles = makeStyles( {
    root: {
        height: '600px',
        width: '800px'
    }
} );

function App() {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Router>
                <Switch>
                    <Route exact path="/index.html">
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
        </div>
    );
}

export default App;
