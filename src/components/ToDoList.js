import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ToDoItem from './ToDoItem';
import DBServices from '../data/DBServices';
import { makeStyles } from '@material-ui/core';
import CreateItem from './CreateItem';

/**
 * @external Task
 * @see ../data/DBServices.js
 */

const useStyles = makeStyles( {
        root: {
            height: '100%'
        },
        mainArea: {
            height: '100%'
        },
        list: {
            // 50px is the height of the CreateItem
            height: 'calc( 100% - 50px )',
            overflow: 'auto',
            paddingTop: 0
        }
} );

export default function ToDoList() {
    const classes = useStyles();
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
     * Add a task to the DB.
     * @param { Task } task 
     */
    async function addTask( task ) {
        try {
            await DBServices.add( task );
            fetchTasks();
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
        } catch( error ) {
            setError( error );
        }
    }
    
    useEffect( () => {
        fetchTasks();
    }, [] );

    return(
        <div className={ classes.root }>
            { error && <p>{ error.message }</p> }
            { tasks &&
                <div className={ classes.mainArea }>
                    <CreateItem addTask={ addTask } />
                    <List className={ classes.list }>
                        { tasks.map( task => (
                            <ToDoItem
                                key={ task.title }
                                task={ task }
                                deleteTask={ deleteTask }
                            />
                        ) ) }
                    </List>
                </div>
            }
        </div>
    );
}
