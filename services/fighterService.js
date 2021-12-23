const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    getAll(req, res) {
        const fighters = FighterRepository.getAll();
        if (!fighters) {
            res.status(404).send({
                error: true,
                message: 'Fighters not found'
            });
        }
            res.status(200).send(fighters);
    }

    createFighter(req, res) {
        const newFighter = FighterRepository.create(req.body);
        if (!newFighter) {
            res.status(400).send({
                error: true,
                message: 'Cannot create Fighter'
            });
        }
            res.status(200).send(newFighter);
    }

    getById(req, res) {
        const fighter = this.search({id: req.params.fighterID});
        if (!fighter) {
            res.status(400).send({
                error: true,
                message: 'Error while find Fighter in db'
            });
        }
        res.status(200).send(fighter);
    }

    putById(req, res) {
        const updateFighter = FighterRepository.update(req.params.fighterID, req.body);
        if (!updateFighter) {
            res.status(400).send({
                error: true,
                message: 'Error while find Fighter in db'
            });
        }
        res.status(200).send(updateFighter);
    }

    deleteById(req, res) {
        FighterRepository.delete(req.params.fighterID);
        res.status(200).send();
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();
