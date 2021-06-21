import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ToDoItem from './ToDoItem';
import DexieSingleton from '../data/DexieSingleton';

export default function ToDoList() {
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
     * @param { Object } task - The task to be added
     * @param { string } task.title - The task's title
     * @param { string } task.description - The task's description
     * @param { bool } task.important - If the task is important or not
     * @param { bool } task.urgent - If the task is urgent or not
     */
    const addTask = ( task ) => {
        db.tasks.add( task )
            .then( () => {
                fetchTasks();
            } )
            .catch( ( error ) => {
                setError( error.message );
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
                    addTask( {
                        title: 'Another task',
                        description: 'Tak\'s description',
                        important: false,
                        urgent: false
                    } );
                } }
            >
                    New task
            </Button>
            { error && <p>{ error.message }</p> }
            { isLoading && <p>Loading...</p> }
            { tasks &&
                <List>
                    { tasks.map( task => (
                        <ToDoItem task={ task } key={ task.title } />
                    ) ) }
                </List>
            }
        </div>
    );
}
