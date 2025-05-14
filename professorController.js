const professores = [
    { 
        id: 1, 
        nome: 'Marcos', 
        idade: 55, 
        departamento: "Quimica", 
        turmas: [
            { codigo: "10A", disciplina: "QUIM101", alunos: ["João", "Maria", "José"] },
            { codigo: "11A", disciplina: "QUIM102", alunos: ["Ana", "Pedro"] }
        ]
    },
    {
        id: 2,
        nome: "Augusto",
        idade: 40,
        departamento: "Matematica",
        turmas: [
            {codigo: "8A", disciplina: "MAT81", alunos: ["Maria", "José"]},
            {codigo: "7A", disciplina: "MAT71", alunos: ["Henrique", "Enzo"]}
        ]
    },
    {
        id: 3,
        nome: "Marlindo",
        idade: 37,
        departamento: "Geografia",
        turmas: [
            {codigo: "9A", disciplina: "GEO91", alunos: ["Sofia", "Vladmir", "Vinicius"]},
            {codigo: "6A", disciplina: "GEO61", alunos: ["Lorena", "Anthony"]}
        ]
    }
];

exports.post = (req, res) => {
    const id = parseInt(req.params.id);  // id do professor
    const { codigo, disciplina, alunos } = req.body;
    
    const professor = professores.find(p => p.id === id); // procuurando pelo id

    if (!professor) {
        return res.status(404).json({ erro: 'Professor não encontrado.' });
    }

    const novaTurma = { codigo, disciplina, alunos }; // criando uma turma nova 
    professor.turmas.push(novaTurma);

    res.status(201).json({ mensagem: 'Turma adicionada com sucesso.', professor });
};

exports.getAll = (req, res) => {
    res.status(200).json(professores);  // listando todos professores
};

exports.getId = (req, res) => {
    const id = parseInt(req.params.id);
    
    
    const professor = professores.find(p => p.id === id); // procurando pelo id

    if (!professor) {
        return res.status(404).json({ erro: 'Professor não encontrado.' });
    }

    res.status(200).json(professor);
};

exports.getClass = (req, res) => {
    const id = parseInt(req.params.id);
    
   
    const professor = professores.find(p => p.id === id); // procurando pelo id

    if (!professor) {
        return res.status(404).json({ erro: 'Professor não encontrado.' });
    }

    res.status(200).json(professor.turmas);
};

exports.put = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, departamento } = req.body;

    
    if (!nome || !idade || !departamento) {
        return res.status(400).json({ erro: 'Todos os campos (nome, idade, departamento) devem ser fornecidos.' }); // verificando se todos os dados foram fornecidos
    }

   
    const professor = professores.find(p => p.id === id); // procurando por id

    if (!professor) {
        return res.status(404).json({ erro: 'Id não existente' });
    }

    // atualizando os dados
    professor.nome = nome;
    professor.idade = idade;
    professor.departamento = departamento;

    res.status(200).json({ mensagem: 'Professor atualizado com sucesso.', professor });
};

exports.getDep = (req, res) => {
    const departamento = req.params.departamento;

    // procurando o professor pelo departamento
    const professoresDoDepartamento = professores.filter(p => p.departamento.toLowerCase() === departamento.toLowerCase());

    if (professoresDoDepartamento.length === 0) {
        return res.status(404).json({ erro: `Nenhum professor encontrado no departamento ${departamento}.` });
    }

    res.status(200).json(professoresDoDepartamento);
};

exports.delete = (req, res) => {
    const id = parseInt(req.params.id);  // pegando id pela url

    // procurando pelo indice do professor
    const index = professores.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Id não existente' });
    }

    
    professores.splice(index, 1);  // removendo o professor

    res.status(200).json({ mensagem: 'Professor removido com sucesso.' });
};
