import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ToDoItem from './ToDoItem';
import DBServices from '../data/DBServices';

export default function ToDoList() {
    const [ tasks, setTasks ] = useState( [] );
    const [ error, setError ] = useState( null );

    /**
     * Fetches the tasks from the local db.
     */
    async function fetchTasks() {
        try {
            const tasks = await DBServices.getAll();
            setTasks( tasks );
        } catch( error ) {
            setError( error );
        }
    }

    /**
     * Deletes a task.
     * @param { number } id - The id of the task to delete
     */
    async function deleteTask( id ) {
        try {
            await DBServices.delete( id );
            fetchTasks();
        } catch( error ) {}
    }
    
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
