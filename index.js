// Importações
const express = require('express');
const professorRoute = require('./routes/professor');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/professores', professorRoute);

app.listen(3000, () => {
    console.log('Servidor rodando na porta: 3000');
});
