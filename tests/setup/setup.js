﻿const path = require('path');
const fs = require('fs');
const MongodbMemoryServer = require('mongodb-memory-server');
const globalConfigPath = path.join(__dirname, 'globalConfig.json');

// MongoDB version needs to be equal to one on mlab.com
const mongod = new MongodbMemoryServer.default({
    instance: {
        dbName: 'jest-scoretables'
    },
    binary: {
        version: '3.6.6'
    }
});

module.exports = async function () {
    const mongoConfig = {
        mongoDBName: 'jest-scoretables',
        mongoUri: await mongod.getConnectionString()
    };

    // Write global config to disk because all tests run in different contexts.
    fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
    console.log('Config is written');

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongod;
    process.env.MONGO_URL = mongoConfig.mongoUri;
};