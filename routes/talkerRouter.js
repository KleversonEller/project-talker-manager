const router = require('express').Router();
const { readFile } = require('../helpers/readWriteFile');

const file = 'talker.json';

router.get('/', async (_req, res) => {
    const result = await readFile(file);

    if (!result) return res.status(200).send([]);

    return res.status(200).send(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await readFile(file);
    const talker = result.find((objeto) => objeto.id === +id);

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).send(talker);
});

module.exports = router;
