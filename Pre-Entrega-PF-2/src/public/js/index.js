const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Configuración de handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Inicio de la aplicación
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});