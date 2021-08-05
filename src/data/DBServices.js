import Dexie from 'dexie';

export default class DBServices {

    /**
     * @typedef { Object } Task
     * @property { string } title - The task's title.
     */

    static db;

    constructor() {
        console.log( 'Use DBServices.getInstance()' );
    }

    /**
     * Returns the Dexie instance.
     * @returns { Object } - Dexie instance.
     */
    static getInstance() {
        if ( !DBServices.db ) {
            DBServices.db = new Dexie( 'TaskDB' );
            DBServices.db.version(1).stores( {
                tasks: '++id, title'
            } );
        }
        return DBServices.db;
    }

    /**
     * Get all tasks.
     * @returns { Promise.<Task[]> } Promise of all tasks in the DB.
     */
    static getAll() {
        const db = DBServices.getInstance();
        return db.tasks.toArray();
    }

    /**
     * Add a task to the DB.
     * @param { Task } task - The task to be added.
     * @returns { Promise } Promise of the addition of the task.
     */
    static add( task ) {
        const db = DBServices.getInstance();
        return db.tasks.add( task );
    }

    /**
     * Deletes a task.
     * @param { number } id - The id of the task to delete.
     * @returns { Promise } Promise of the deletion of a task.
     */
    static delete( id ) {
        const db = DBServices.getInstance();
        return db.tasks.delete( id );
    }
}
