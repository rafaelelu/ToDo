import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DexieSingleton from '../data/DexieSingleton';

const useStyles = makeStyles( {
    field: {
        marginBottom: 20,
        display: 'block'
    }
} );

export default function Create() {
    const classes = useStyles();
    const history = useHistory();

    const [ title, setTitle ] = useState( '' );
    const [ titleError, setTitleError ] = useState( false );
    const [ description, setDescription ] = useState( '' );
    const [ descriptionError, setDescriptionError ] = useState( false );
    const [ important, setImportant ] = useState( false );
    const [ urgent, setUrgent ] = useState( false );

    const db = DexieSingleton.getInstance();

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
                history.push( '/' );
            } );
    };

    /**
     * Handles the submit event
     * @param { Object } event - Event
     */
    const handleSubmit = ( event ) => {
        event.preventDefault();

        setTitleError( title === '' );
        setDescriptionError( description === '' );

        if ( title && description ) {
            addTask( { title, description, important, urgent } );
        }
    };

    return (
        <Container>
            <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create a new task
            </Typography>

            <form noValidate="off" onSubmit={ handleSubmit }>
                <TextField
                    onChange={ ( event ) => setTitle( event.target.value ) }
                    className={ classes.field }
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    error={ titleError }
                />

                <TextField
                    onChange={ ( event ) => setDescription( event.target.value ) }
                    className={ classes.field }
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={ 4 }
                    fullWidth
                    required
                    error={ descriptionError }
                />

                <Button
                    onClick={ () => history.push( '/' ) }
                    type="button"
                    variant="contained"
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Submit
                </Button>

            </form>
        </Container>
    );
}
