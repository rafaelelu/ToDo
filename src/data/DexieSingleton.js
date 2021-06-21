import Dexie from 'dexie';

export default class DexieSingleton {

    static db;

    constructor() {
        console.log( 'Use DexieSingleton.getInstance()' );
    }

    /**
     * Returns the Dexie instance.
     * @returns { Object } - Dexie instance
     */
    static getInstance() {
        if ( !DexieSingleton.db ) {
            DexieSingleton.db = new Dexie( 'TaskDB' );
            DexieSingleton.db.version(1).stores( {
                tasks: '++id, title, description, important, urgent'
            } );
        }
        return DexieSingleton.db;
    }
}
