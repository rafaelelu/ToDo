import { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import SpeedIcon from '@material-ui/icons/Speed';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ToDoItem( { task, updateTask, deleteTask } ) {
    const [ checked, setChecked ] = useState( task.checked );
    const [ important, setImportant ] = useState( task.important );
    const [ urgent, setUrgent ] = useState( task.urgent );
    return (
        <ListItem divider dense>
            <ListItemIcon>
                <Checkbox
                    controlled="true"
                    color="secondary"
                    title="Mark task as checked"
                    checked={ checked }
                    onChange={ () => {
                        setChecked( !checked );
                        updateTask( { ...task, checked: !checked } );
                    } }
                />
            </ListItemIcon>
            <ListItemText primary={ task.title } style={ { textDecoration: checked ? 'line-through' : 'none' } } />
            <IconButton
                title="Important"
                onClick={ () => {
                    setImportant( !important );
                    updateTask( { ...task, important: !important } );
                } }
            >
                <PriorityHighIcon color={ important ? 'secondary' : 'action' } />
            </IconButton>
            <IconButton
                title="Urgent"
                onClick={ () => {
                    setUrgent( !urgent );
                    updateTask( { ...task, urgent: !urgent } );
                } }
            >
                <SpeedIcon color={ urgent ? 'secondary' : 'action' } />
            </IconButton>
            <IconButton
                edge="end"
                title="Delete"
                onClick={ () => deleteTask( task.id ) }
            >
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
}
