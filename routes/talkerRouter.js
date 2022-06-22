const router = require('express').Router();
const { readFile, writeContentFile } = require('../helpers/readWriteFile');

const validToken = require('../middleware/validToken');
const validName = require('../middleware/validName');
const validAge = require('../middleware/validAge');
const validTalk = require('../middleware/validTalk');
const validWatchedAt = require('../middleware/validWatchedAt');
const validRate = require('../middleware/validRate');

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

router.post('/',
    validToken,
    validName,
    validAge,
    validTalk,
    validWatchedAt,
    validRate,
    async (req, res) => {
        const { name, age, talk } = req.body;

        await writeContentFile(file, { age, id: 5, name, talk });

        return res.status(201).send({ age, id: 5, name, talk });
});

module.exports = router;
