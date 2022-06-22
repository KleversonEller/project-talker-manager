module.exports = (req, res, next) => {
    try {
        const { age } = req.body;

        if (!age) {
            return res.status(400).json({ message: 'O campo "age" é obrigatório' });
        }

        if (age < 18) {
            return res.status(400)
            .json({ message: 'A pessoa palestrante deve ser maior de idade' });
        }

        return next();
    } catch (error) {
        return res.status(500).end();
    }
};
