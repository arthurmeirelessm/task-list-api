import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {


    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                //Virtual: Exibido no request ou response do endpoint mas não é criado no banco
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
       
        //Metodo addHook: "Antes de ler e criar o usuario no banco passado pelo requet, será feito isso com essa propriedade (password).". Nesse Caso foi usado o 'beforeSave'
        //'BeforeSave': Ou salvar antes, no contexto abaixo, é usado para salvar o passaword criptografado.
        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
         return bcrypt.compare(password, this.password_hash);
    }
}

export default User;