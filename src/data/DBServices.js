import Dexie from 'dexie';
import Utils from './utils/Utils';

export default class DBServices {

    /**
     * @typedef { Object } Task
     * @property { number } id - The task's id.
     * @property { string } title - The task's title.
     * @property { boolean } checked - If the task is checked or not.
     * @property { boolean } important - If the taks is important or not.
     * @property { bollean } urgent - If the task is urgent or not.
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
                tasks: '++id, title, checked, important, urgent'
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
        return db.tasks.toCollection().sortBy( 'title', array => {
            return array.sort( Utils.compare );
        } );
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
     * Update a task.
     * @param { Task } task 
     * @returns { Promise } Promise of the update of the task.
     */
    static update( task ) {
        const db = DBServices.getInstance();
        return db.tasks.update( task.id, task );
    }

    /**
     * Deletes a task.
     * @param { number } id - The id of the task to delete.
     * @returns { Promise } Promise of the deletion of the task.
     */
    static delete( id ) {
        const db = DBServices.getInstance();
        return db.tasks.delete( id );
    }
}
