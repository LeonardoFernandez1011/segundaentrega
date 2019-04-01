const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./helpers')

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials)
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        curso: 'Mate'
    });
});

app.get('/crear', (req, res) => {
    res.render('crear', {
        curso: 'español'
    })
})

app.post('/crear', (req, res) => {
    res.render('crear', {
        nombreCurso: req.body.nombreCurso,
        idCurso: req.body.idCurso,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intensidad: req.body.intensidad
    })
})

app.post('/inscribir', (req, res) => {
    res.render('inscribir', {
        nombreUser: req.body.nombreUser,
        documentUser: req.body.documentUser,
        emailUser: req.body.emailUser,
        telephoneUser: req.body.telephoneUser,
        nombreCurso: req.body.nombreCurso
    })
})

app.put('/crear', (req, res) => {
    res.render('crear', {
        estado: req.body.estado
    })
})

app.get('/ver', (req, res) => {
    res.render('ver', {
        curso: 'programacion'
    })
})

app.get('/inscribir', (req, res) => {
    res.render('inscribir', {
        curso: 'Fisica'
    })
})

app.get('/verinscritos', (req, res) => {
    res.render('verinscritos', {
        curso: 'lenguaje'
    })
})

app.listen(3000, () => {
    console.log('Estamos en el puerto 3000');

})
