import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

export default function ToDoItem( { task, deleteTask } ) {
    return (
        <ListItem divider dense>
            <ListItemIcon>
                <Checkbox onChange={ () => deleteTask( task.id ) } />
            </ListItemIcon>
            <ListItemText primary={ task.title } />
        </ListItem>
    );
}
