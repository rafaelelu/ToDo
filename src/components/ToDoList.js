import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ToDoItem from './ToDoItem';
import DBServices from '../data/DBServices';

export default function ToDoList() {
    const [ tasks, setTasks ] = useState( [] );
    const [ error, setError ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );

    /**
     * Fetches the tasks from the local db
     */
    const fetchTasks = () => {
        setIsLoading( true );
        DBServices.getAll()
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
        DBServices.delete( id )
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
                    DBServices.add( {
                        title: 'Task ' + parseInt( Math.random() * 100 )
                    } ).then( res => fetchTasks() );
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
