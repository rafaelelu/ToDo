import { makeStyles } from '@material-ui/core';
import ToDoList from './components/ToDoList';

const useStyles = makeStyles( {
    root: {
        height: '600px',
        width: '750px',
        overflow: 'hidden'
    }
} );

function App() {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <ToDoList />
        </div>
    );
}

export default App;
