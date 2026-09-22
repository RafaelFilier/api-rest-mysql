const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller');

router.post("/", async (req, res) => {
    controller.Cadastrar(req,res)
});

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (e) {
        res.status(500).json({ erro: "Falha ao listar usuarios"});
    }
});

router.put("/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        const [result] = await pool.query(
            "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
            [nome || null, email || null, id]
        );
        
        if(!result.affectedRows) {
            return res.status(404).json({erro: "Usuario não encontrado"});
        }
        res.json({ mensagem: "Atualizado com sucesso" });
    }catch(e) {
        res.status(500).json({ erro: "Falha ao atualizar usuario"});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({ erro:  "Usuário não encontrado"});
        }

        res.json({ mensagem: "Deletado com sucesso" });
    }catch(e) {
        res.status(500).json({ erro: "Falha ao deletar usuario"});
    }
});

export{
    router
}