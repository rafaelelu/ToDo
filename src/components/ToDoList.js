import List from "@material-ui/core/List";
import ToDoItem from './ToDoItem';

const tasks = [
    {
        title: 'Sacar a pasear a Joe',
        description: 'Ir al parque con Joe',
        important: true,
        urgent: true
    },
    {
        title: 'Comprar leche',
        description: 'Ir al súper y comprar leche',
        important: true,
        urgent: false
    },
    {
        title: 'Arreglar mi cuarto',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        important: false,
        urgent: true
    },
    {
        title: 'Otra tarea',
        description: 'This is a test description',
        important: false,
        urgent: false
    }
];



export default function ToDoList() {
    return(
        <List>
            { tasks.map( task => (
                <ToDoItem task={ task } key={ task.title } />
            ) ) }
        </List>
    );
}
