export default class Utils {

    /**
     * @external Task
     * @see ../DBServices.js
     */

    static IMPORTANT_URGENT = 1;
    static IMPORTANT_NOT_URGENT = 2;
    static NOT_IMPORTANT_URGENT = 3;
    static NOT_IMPORTANT_NOT_URGENT = 4;
    static CHECKED = 5;

    constructor() {
        console.log( 'Not meant to be instantiated' );
    }

    /**
     * Comapres two tasks for sorting.
     * @param { Task } task1 - Task.
     * @param { Task } task2 - Task to be compared with.
     */
    static compare( task1, task2 ) {
        const priority1 = Utils._getPriority( task1 );
        const priority2 = Utils._getPriority( task2 );
        if ( priority1 < priority2 ) {
            return -1;
        }
        if ( priority1 > priority2 ) {
            return 1;
        }
        if ( priority1 === priority2 ) {
            return Utils._compareTitles( task1.title, task2.title );
        }
    }

    /**
     * Gets the task priority.
     * @param { Task } task 
     */
    static _getPriority( task ) {
        if ( task.checked ) {
            return Utils.CHECKED;
        }
        if ( !task.important && !task.urgent ) {
            return Utils.NOT_IMPORTANT_NOT_URGENT;
        }
        if ( !task.important && task.urgent ) {
            return Utils.NOT_IMPORTANT_URGENT;
        }
        if ( task.important && !task.urgent ) {
            return Utils.IMPORTANT_NOT_URGENT;
        }
        if ( task.important && task.urgent ) {
            return Utils.IMPORTANT_URGENT;
        }
        return Utils.CHECKED;
    }

    /**
     * Compares the titles of two tasks.
     * @param { string } title1 - Title.
     * @param { string } title2 - Title to be compared with.
     */
    static _compareTitles( title1, title2 ) {
        if ( title1 < title2 ) {
            return -1;
        }
        if ( title1 > title2 ) {
            return 1;
        }
        return 0;
    }

}
