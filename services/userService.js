const { UserRepository } = require('../repositories/userRepository');

class UserService {

    getAll(req, res) {
        const users = UserRepository.getAll();
        if (!users) {
            res.status(404).send({
                error: true,
                message: 'Users not found'
            });
        }
            res.status(200).send(users);
    }

    createUser(req, res) {
        const newUser = UserRepository.create(req.body);
        if (!newUser) {
            res.status(400).send({
                error: true,
                message: 'Cannot create User'
            });
        }
            res.status(200).send(JSON.stringify(newUser));
    }

    getById(req, res) {
        const user = this.search( {id: req.params.userID });
        if (!user) {
            res.status(400).send({
                error: true,
                message: 'Error while find User in db'
            });
        }
        res.status(200).send(user);
    }

    putById(req, res) {
        const updateUser = UserRepository.update(req.params.userID, req.body);
        if (!updateUser) {
            res.status(400).send({
                error: true,
                message: 'Error while find User in db'
            });
        }
        res.status(200).send(updateUser);
    }

    deleteById(req, res) {
        UserRepository.delete(req.params.userID);
        res.status(200).send();
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();
