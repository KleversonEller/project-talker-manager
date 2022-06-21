const router = require('express').Router();
const { readFile } = require('../helpers/readWriteFile');

const file = 'talker.json';

router.get('/', async (_req, res) => {
    const result = await readFile(file);

    if (!result) return res.status(200).send([]);

    return res.status(200).send(result);
});

module.exports = router;
