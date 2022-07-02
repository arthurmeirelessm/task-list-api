import Task from '../models/Task';
import * as Yup from 'yup';


class TaskController {
     async index(req, res) {
           
     }



    async store(req, res) {
        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if (!(schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Invalid request' });
        }

        const { task } = req.body;
        const createTask = await Task.create({
            user_id: req.userId,
            task,
        })

        return res.json(createTask);
    }
}


export default new TaskController()