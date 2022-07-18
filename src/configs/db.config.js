const env = process.env;
const db = {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME || 'test',
    port: env.DB_PORT || 27017
};

module.exports = db;