import dotenv from 'dotenv';

dotenv.config();

const dbConfigGenerator = (databaseName) => ({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: databaseName,
    host: process.env.HOST,
    dialect: 'postgres',
    logging: false
});

const development = dbConfigGenerator(process.env.DEVELOP_DB_NAME);
const test = dbConfigGenerator(process.env.TEST_DB_NAME);
const production = dbConfigGenerator(process.env.PRODUCTION_DB_NAME);

export default {
  development,
  test,
  production
};

export {
  development,
  test,
  production
};
