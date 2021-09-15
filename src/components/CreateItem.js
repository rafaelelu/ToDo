import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import SpeedIcon from '@material-ui/icons/Speed';

const useStyles = makeStyles( theme => ( {
    textField: {
        height: '50px',
        display: 'flex',
        paddingLeft: '16px',
        paddingRight: '16px',
        backgroundColor: '#eeeeee'

    },
    input: {
        marginLeft: theme.spacing( 1 ),
        flex: 1,
      },
    iconButton: {
        padding: 10,
    }
} ) );

export default function CreateItem( { addTask } ) {
    const classes = useStyles();
    const [ title, setTitle ] = useState( '' );
    const [ important, setImportant ] = useState( false );
    const [ urgent, setUrgent ] = useState( false );

    /**
     * Clears the text input, the importance icon button and the urgency icon button.
     */
    function clearInputs() {
        setTitle( '' );
        setImportant( false );
        setUrgent( false );
    }

    /**
     * Adds a new task and clears the inputs.
     */
    function handleSubmit() {
        if ( title.trim() ) {
            addTask( {
                title: title,
                important: important,
                urgent: urgent,
                checked: false
            } );
            clearInputs();
        }
    }

    return (
        <div className={ classes.textField }>
            <IconButton
                className={ classes.iconButton }
                aria-label="add new"
                title="Add new task"
                onClick={ () => handleSubmit() }
            >
                <Add />
            </IconButton>
            <InputBase
                autoFocus
                className={ classes.input }
                value={ title }
                onKeyDown={ ( event ) => {
                    if ( event.key === 'Enter' ) {
                        handleSubmit();
                    }
                } }
                onChange={ ( event ) => setTitle( event.target.value ) }
                placeholder="Add a new task"
                inputProps={ { 'aria-label': 'Add new task' } }
            />
            <IconButton onClick={ () => setImportant( !important ) } title="Important">
                <PriorityHighIcon color={ important ? 'secondary' : 'action' } />
            </IconButton>
            <IconButton onClick={ () => setUrgent( !urgent ) } title="Urgent">
                <SpeedIcon color={ urgent ? 'secondary' : 'action' } />
            </IconButton>
        </div>
    );
}
