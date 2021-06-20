import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

export default function ToDoItem( { task } ) {
    return (
        <ListItem divider>
            <ListItemIcon>
                <Checkbox />
            </ListItemIcon>
            <ListItemText primary={ task.title } secondary={ task.description } />
        </ListItem>
    );
}
