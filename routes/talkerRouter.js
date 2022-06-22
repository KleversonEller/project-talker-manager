const router = require('express').Router();
const { readFile, writeContentFile, writeFile } = require('../helpers/readWriteFile');

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

router.get('/search', validToken, async (req, res) => {
    const { q } = req.query;
    
    const talkers = await readFile(file);

    if (!q) {
        return res.status(200).send(talkers);
    }

    const result = talkers.filter((objeto) => objeto.name.includes(q));

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

router.put('/:id',
    validToken,
    validName,
    validAge,
    validTalk,
    validWatchedAt,
    validRate,
    async (req, res) => {
        const { name, age, talk } = req.body;
        const { id } = req.params;

        const talkers = await readFile(file);

        const newTalker = talkers.map((objeto) => (objeto.id === +id
        ? { age, id: +id, name, talk }
        : objeto));

        await writeFile(file, newTalker);

        return res.status(200).send({ age, id: +id, name, talk });
});

router.delete('/:id', validToken, async (req, res) => {
    const { id } = req.params;

    const talkers = await readFile(file);

    const result = talkers.filter((tak) => tak.id !== +id);

    await writeFile(file, result);

    res.status(204).end();
});

module.exports = router;
