const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];
listaInscritos = [];

hbs.registerHelper('crear', (nombreCurso, idCurso, descripcion, valor, modalidad, intensidad) => {

    if (nombreCurso) {

        let creaCurso = {
            nombreCurso: nombreCurso,
            idCurso: idCurso,
            descripcion: descripcion,
            valor: valor,
            modalidad: modalidad,
            intensidad: intensidad,
            estado: 'Diponible'
        }
        console.log('Curso', creaCurso);
        let duplicado = listaCursos.find(nom => nom.idCurso == idCurso)
        if (!duplicado) {
            listaCursos.push(creaCurso);
            console.log(listaCursos);

            let datos = JSON.stringify(listaCursos);
            fs.writeFile('cursos.json', datos, (err) => {
                if (err) throw (err);
                console.log('Archivo Creado con Exito');
            })

        } else {
            let texto = "<h1>Ya existe un curso con este ID</h1>";
            console.log('Ya existe un curso con este ID');
            return texto
        }
    }

})

hbs.registerHelper('mostrar', () => {
    listaCursos = require('../cursos.json');
    listaCurso = require('../cursos.json');
    let texto1 = `<div class="form-group">\
                <label>Seleccione el Curso:</label>\              
                  <select class="form-control" name="nombreCurso">\
                <option value="-">Cursos Activos</option>`
    listaCurso.forEach(curso => {
        if (curso.estado == 'Diponible') {
            texto1 = texto1 + `<option value="${curso.nombreCurso}">${curso.nombreCurso}</option>`

        }
    });
    texto1 = texto1 + `</select><br></div>`

    let texto = "<table>\
    <thead>\
    <th> Nombre del Curso </th>\
    <th> Valor </th>\
    </thead>\
    <tbody>"

    listaCursos.forEach(curso => {
        if (curso.estado == 'Diponible') {
            texto = texto +
                "<tr> " +
                "<td>" + curso.nombreCurso + '</td>' +
                "<td> <a href='/ver'>" + curso.valor + '</a></td></tr>'
        }
    });

    return texto, texto1

})

hbs.registerHelper('mostrartodo', () => {
    listaCursos = require('../cursos.json');
    let texto = "<table>\
    <thead>\
    <th> Nombre del Curso Nombre</th>\
    <th> ID </th>\
    <th> Descripción </th>\
    <th> Valor </th>\
    <th> Modalidad </th>\
    <th> Intensidad </th>\
    <th> Estado </th>\
    <th> Editar </th>\
    </thead>\
    <tbody>"

    listaCursos.forEach(curso => {
        texto = texto +
            "<tr> " +
            "<td>" + curso.nombreCurso + '</td>' +
            "<td> " + curso.idCurso + '</td>' +
            "<td> " + curso.descripcion + '</td>' +
            "<td> " + curso.valor + '</td>' +
            "<td> " + curso.modalidad + '</td>' +
            "<td> " + curso.intensidad + '</td>' +
            "<td> " + curso.estado + '</td>' +
            "<td> <button>" + "Cambiar Estado" + '</button></td></tr>'
    }
    );

    return texto
})

hbs.registerHelper('inscribir', (nombreUser, documentUser, emailUser, telephoneUser, nombreCurso) => {
    listaCursos = require('../cursos.json');
    let texto = `<div class="form-group">\
                <label>Seleccione el Curso:</label>\              
                  <select class="form-control" name="nombreCurso">\
                <option value="-">Cursos Activos</option>`
    listaCursos.forEach(curso => {
        if (curso.estado == 'Diponible') {
            texto = texto + `<option value="${curso.nombreCurso}">${curso.nombreCurso}</option>`

        }
    });
    texto = texto + `</select><br></div>`
    if (nombreUser) {
        let creaUser = {
            nombreUser: nombreUser,
            documentUser: documentUser,
            emailUser: emailUser,
            telephoneUser: telephoneUser,
            nombreCurso: nombreCurso
        }
        console.log('user', creaUser);
        let duplicado = listaInscritos.find(nom => nom.nombreUser == nombreUser && nom.nombreCurso == nombreCurso)
        if (!duplicado) {
            listaInscritos.push(creaUser);
            console.log(listaInscritos);

            let datos = JSON.stringify(listaInscritos);
            fs.writeFile('inscritos.json', datos, (err) => {
                if (err) throw (err);
                console.log('Estudiante registrado con exito');
            })

        } else {
            let alerta = "<h1>El alumno ya esta registrado a este curso</h1>";
            console.log('Ya existe un usuario inscrito en este id este ID');
            return alerta
        }
    }
    return texto


})


hbs.registerHelper('mostrarestudiantes', () => {
    listaInscritos = require('../inscritos.json');
    let texto = "<table>\
   <thead>\
    <th> Nombre del Curso </th>\
    <th> Nombre del Estudiante </th>\
    <th> Documento </th>\
    <th> Correo </th>\
    <th> Número Telefonico</th>\
    </thead>\
    <tbody>"

    listaInscritos.forEach(estudiante => {
        texto = texto +
            "<tr> " +
            "<td>" + estudiante.nombreCurso + '</td>' +
            "<td> " + estudiante.nombreUser + '</td>' +
            "<td> " + estudiante.documentUser + '</td>' +
            "<td> " + estudiante.emailUser + '</td>' +
            "<td> " + estudiante.telephoneUser + '</td>' +
            "<td> <button>" + "Eliminar Estudiante" + '</button></td></tr>'
    }
    );

    return texto
})
