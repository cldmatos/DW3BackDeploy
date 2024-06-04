const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

//POST (INSERT) Inserindo um novo Funcionario no Mongo
router.post('/', (req, res) => {
    const { nome, telefone, email, cpf, cargo, salario, desligado } = req.body;
    if(!nome && !telefone && !email && !cpf && !cargo && !salario && !desligado) {
        return res.status(422).json({ error: 'O preenchimento de todos os campos é obrigatório!'});
    }
    const funcionario = {
        nome,
        telefone,
        email,
        cpf,
        cargo,
        salario,
        desligado
    };
    try {
        Funcionario.create(funcionario);
        res.status(201).json({ message: 'Funcionario cadastrado com sucesso!'});
    } catch (error) {
        rest.status(500).json({ error: error });
    }

})

router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find(); // Buscar todos os documentos na coleção "Funcionario"
        res.status(200).json(funcionarios); // Retornar a lista de funcionários no corpo da resposta
    } catch (error) {
        res.status(500).json({ error: error }); // Erro interno do servidor
    }
 });

router.get('/:id', async (req, res) => {
    try {
      const funcionario = await Funcionario.findById(req.params.id); // Buscar funcionário pelo ID
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado!' });
      }
      res.status(200).json(funcionario);
    } catch (error) {
      res.status(500).json({ error: error });
    }
});

router.put('/:id', async (req, res) => {
     try {
      const { nome, telefone, email, cpf, cargo, salario, desligado } = req.body;
      const id = req.params.id;
  
      const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(id, {
        nome,
        telefone,
        email,
        cpf,
        cargo,
        salario,
        desligado
      });
  
      if (!funcionarioAtualizado) {
       return res.status(404).json({ error: 'Funcionário não encontrado!' });
      }
  
      res.status(200).json({ message: 'Funcionário atualizado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

router.delete('/:id', async (req, res) => {
     try {
       const id = req.params.id;
  
       const funcionarioRemovido = await Funcionario.findByIdAndDelete(id);
  
       if (!funcionarioRemovido) {
        return res.status(404).json({ error: 'Funcionário não encontrado!' });
       }
  
       res.status(200).json({ message: 'Funcionário excluído com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });  

module.exports = router;