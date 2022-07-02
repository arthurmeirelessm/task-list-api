import Sequelize, { Model } from 'sequelize';


class Task extends Model {

    static init(sequelize) {
        super.init(
            {
                task: Sequelize.STRING,
                check: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            } 
        );

           return this;
    }

//Associate: Onde vai ser feito os relacionamentos de user id, que foi declarado na migration de tasks
//Para os endspoints de tasks (andamento das tarefas do user), é preciso estar logado um user, obviamente, então, aqui iremos tratar
//belongsTo: Metodo que traduzido significa "Pertence a".
    static associate(models) {
         this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }
};


export default Task;
