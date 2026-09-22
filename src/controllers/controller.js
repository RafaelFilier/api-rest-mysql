const { cadastrar, listar, atualizar, deletar} = require('../models/model')

module.exports ={
   Cadastro (req,res){
        const { nome, email} = req.body;

        if(!nome || !email){
            return res.status(400).json({ message: "todos os campos tem que estar preenchidos"})
        }
        cadastrar( nome, email, (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Erro ao cadastrar usuário", error: error });
            }
            res.status(201).json(results);
        });

    },

    Listar (req,res){
       
        listar( (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Erro ao listar treinos", error: error });
            }
            res.status(200).json(results);
        });
    },

    Atualizar (req,res){
        const {id} = req.params;
        const { nome, email} = req.body;

        atualizar(id, nome, email, (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Erro ao cadastrar usuário", error: error });
            }
            res.status(201).json(results);
        });


    }
}