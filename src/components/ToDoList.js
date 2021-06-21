import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ToDoItem from './ToDoItem';
import DexieSingleton from '../data/DexieSingleton';

export default function ToDoList() {
    const history = useHistory();
    const [ tasks, setTasks ] = useState( [] );
    const [ error, setError ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );
    const db = DexieSingleton.getInstance();

    /**
     * Fetches the tasks from the local db
     */
    const fetchTasks = () => {
        setIsLoading( true );
        db.tasks.toArray()
            .then( ( tasks ) => {
                setTasks( tasks );
            } )
            .catch( ( error ) => {
                setError( error );
            } )
            .finally( () => {
                setIsLoading( false );
            } );
    };

    /**
     * 
     * @param { number } id - The id of the task to delete
     */
    const deleteTask = ( id ) => {
        db.tasks.delete( id )
            .then( () => {
                fetchTasks();
            } );
    };
    
    useEffect( () => {
        fetchTasks();
    }, [] );

    return(
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={ () => {
                    history.push( '/create' );
                } }
            >
                    New task
            </Button>
            { error && <p>{ error.message }</p> }
            { isLoading && <p>Loading...</p> }
            { tasks &&
                <List>
                    { tasks.map( task => (
                        <ToDoItem
                            key={ task.title }
                            task={ task }
                            deleteTask={ deleteTask }
                        />
                    ) ) }
                </List>
            }
        </div>
    );
}
