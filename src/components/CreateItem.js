import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles( theme => ( {
    textField: {
        height: '51px',
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

    function handleSubmit() {
        if ( title.trim() ) {
            addTask( { title } );
            setTitle( '' );
        }
    }

    return (
        <div className={ classes.textField }>
            <IconButton
                className={ classes.iconButton }
                aria-label="add new"
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
                inputProps={ { 'aria-label': 'add a new task' } }
            />
        </div>
    );
}
