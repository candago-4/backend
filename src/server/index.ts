import dotenv from "dotenv";
import app from '../routes/index'

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});