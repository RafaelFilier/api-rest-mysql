const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

function cadastrar (nome,email){
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
}

function listar (){
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (e) {
        res.status(500).json({ erro: "Falha ao listar usuarios"});
    }
}

function atualizar(id){
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
}

function deletar(id){
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
}





module.exports = {
    cadastrar,
    listar,
    atualizar,
    deletar
}