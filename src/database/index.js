import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Task from '../app/models/Task';


const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    //Aqui em baixo o map é utilizado pra percorrer os models do projeto que são declarados lá em cima
    //e iniciar uma conexão com o banco passando o this.connection
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

}


export default new Database();