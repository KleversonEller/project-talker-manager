module.exports = (req, res, next) => {
    try {
        const { talk: { watchedAt } } = req.body;

        if (!watchedAt) {
            return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
        }

        const watRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
        if (!watRegex.test(watchedAt)) {
            return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        }

        return next();
    } catch (error) {
        return res.status(500).end();
    }
};
