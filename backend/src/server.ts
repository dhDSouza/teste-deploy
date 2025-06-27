import express, { Application, Request, Response } from "express";
import cors from "cors"

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

class User {
    constructor(public name: string, public age: number) {}
}

const users: User[] = [];

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "API funcionando perfeitamente" });
});

app.post('/users', (req: Request, res: Response) => {
    const { name, age } = req.body;

    if(!name || !age) {
        res.status(400).json({ message: "Todos os campos são necessários" });
        return;
    }

    if (isNaN(age) || age < 0) {
        res.status(400).json({ message: "Informe uma idade válida!" });
        return;        
    }

    const user = new User(name, age);
    users.push(user);

    res.status(201).json({ message: "Usuário criado com sucesso!" })
    return;
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})