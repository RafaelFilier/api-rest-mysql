import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3002;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const { nome, email } = req.body;

        const [result] = await pool.query(
            "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
            [nome, email]
        );

        res.status(201).json({ id: result.insertId, nome, email });
    } catch (e) {
        res.status(500).json({ erro: "Falha ao criar usuario" });
    }
});

app.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (e) {
        res.status(500).json({ erro: "Falha ao listar usuarios"});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});