module.exports = {
  HOST: "localhost",
  USER: "admin_local",
  PASSWORD: "password",
  DB: "own_project_db",
  dialect: "mysql",
  PORT: 3308,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
