module.exports = (req, res, next) => {
    try {
        const { talk: { rate } } = req.body;

        if (rate === undefined) {
            return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
        }

        if (rate < 1 || rate > 5) {
            return res.status(400)
            .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        }

        return next();
    } catch (error) {
        return res.status(500).end();
    }
};
