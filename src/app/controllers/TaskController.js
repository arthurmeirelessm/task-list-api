import Task from '../models/Task';
import * as Yup from 'yup';


class TaskController {
    async index(req, res) {
        const { check } = req.query
        const getTasks = await Task.findAll({
            where: { user_id: req.userId, check: check }
        });
        return res.json(getTasks)
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

    async update(req, res) {

        const schema = Yup.object().shape({
            task: Yup.string(),
        });

        const test = (schema.isValid(req.body));
        if (!test) {
            return res.status(401).json({ Error: 'Invalid request.' });
        }

        const { task_id } = req.params;
        const findTask = await Task.findByPk(task_id);

        if (!findTask) {
            return res.status(401).json({ Error: 'Task not exists.' });
        }

        const updateTask = await findTask.update(req.body);

        console.log(updateTask)
        return res.json(updateTask);
    }
}


export default new TaskController()