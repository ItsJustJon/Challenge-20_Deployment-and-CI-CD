import models from '../models/index.js';
import db from '../config/connection.js';
export default async (modelName, collectionName) => {
    try {
        if (!models[modelName].db?.db) {
            throw new Error(`Database connection for model "${modelName}" is not available.`);
        }
        let modelExists = await models[modelName].db.db.listCollections({
            name: collectionName
        }).toArray();
        if (modelExists.length) {
            await db.dropCollection(collectionName);
        }
    }
    catch (err) {
        throw err;
    }
};
