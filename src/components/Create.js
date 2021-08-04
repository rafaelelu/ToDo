import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DBServices from '../data/DBServices';

const useStyles = makeStyles( {
    field: {
        marginBottom: 20,
        display: 'block'
    }
} );

export default function Create() {
    const classes = useStyles();

    const [ title, setTitle ] = useState( '' );
    const [ titleError, setTitleError ] = useState( false );
    const [ description, setDescription ] = useState( '' );
    const [ important, setImportant ] = useState( false );
    const [ urgent, setUrgent ] = useState( false );

    const db = DBServices.getInstance();

    /**
     * Handles the submit event
     * @param { Object } event - Event
     */
    const handleSubmit = ( event ) => {
        event.preventDefault();

        setTitleError( title === '' );

        if ( title ) {
            addTask( { title, description, important, urgent } );
        }
    };

    return (
        <Container>
            <Typography
                variant="h6"
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
                />

                <Button
                    onClick={ () => {
                        DBServices.add( {
                            title: 'Task ' + parseInt( Math.random() * 100 )
                        } )
                            .then( res => console.log( 'added' ) );
                    } }
                    type="button"
                    variant="contained"
                    color="secondary"
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
