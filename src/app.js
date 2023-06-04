import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars'
import { __dirname } from './utils/utils.js';
import viewsRouter from './router/viewsRouter.js'

const app = express();
const PORT = 3003

app.engine(
    "handlebars",
    engine({
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', viewsRouter)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error', (error) => console.log(error));