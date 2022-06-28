import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';


const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(models => models.init(this.connection));
  }

}


export default new Database();