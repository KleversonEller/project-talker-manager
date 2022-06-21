const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkerRouter = require('./routes/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', (req, res) => {
  try {
      const { email, password } = req.body;

      if ([email, password].includes(undefined)) {
        return res.status(401).json({ message: 'missing fields' }); 
}
      const token = crypto.randomBytes(8).toString('hex');

      return res.status(200).json({ token });
  } catch (error) {
      res.status(500).end();
  }
});

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
