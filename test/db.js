const { MongoMemoryServer } = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');

async function open() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const mongooseOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    await mongoose.connect(uri, mongooseOpt);
}

async function close() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}

async function clear() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const coll = collections[key];
        await coll.deleteMany();
    }
}

module.exports = {
    open,
    close,
    clear
}

