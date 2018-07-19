const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const dpt = require('../models/dpt');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const hbs = require('hbs');


//Get all DPT´s
router.get('/dpt', ensureLoggedIn(), (req, res) => {
  dpt.find()
    .then( (dpt) => {      
      res.render('dpts/catalog', {dpt});
    })
    .catch( (err) => {
      console.log(err);
    });
});

//Add a DPT
router.get("/dpt/new", ensureLoggedIn(), (req, res, next) => {
  res.render('dpts/new');
});

/* Adding new DPT*/
router.post("/dpt/new", ensureLoggedIn(), (req, res, next) => {
  const { Denom, Area, Colectivo, Mision, Funciones, TareasTipo1, TareasDedicacion1, TareasResultado1, TareasTipo2, TareasDedicacion2, TareasResultado2, TareasTipo3, TareasDedicacion3, TareasResultado3, TareasTipo4, TareasDedicacion4, TareasResultado4, TareasTipo5, TareasDedicacion5, TareasResultado5, FormacionTitulo, Idiomas, FormacionExperiencia, FormacionHabilidades, ResponsabilidadNivel, Colaboradores, SupervisionNivel, CondicionesTurnicidad, CondicionesColaboradores, CondicionesNocturnidad, CondicionesPeligro} = req.body;
  const Tareas = [{tipo: TareasTipo1, resultado: TareasResultado1, dedicacion: TareasDedicacion1}, {tipo: TareasTipo2, resultado: TareasResultado2, dedicacion: TareasDedicacion2}, {tipo: TareasTipo3, resultado: TareasResultado3, dedicacion: TareasDedicacion3}, {tipo: TareasTipo4, resultado: TareasResultado4, dedicacion: TareasDedicacion4}, {tipo: TareasTipo5, resultado: TareasResultado5, dedicacion: TareasDedicacion5}]
  const Formacion = {titulo: FormacionTitulo, idiomas: Idiomas, experiencia: FormacionExperiencia, habilidades: FormacionHabilidades}
  const Responsabilidad = {NivRes: ResponsabilidadNivel, Colaboradores: Colaboradores, NivSuperv: SupervisionNivel}
  const Condiciones = {turnicidad: CondicionesTurnicidad, Colaboradores: CondicionesColaboradores, nocturnidad: CondicionesNocturnidad, peligro: CondicionesPeligro}
  const newDpt = new dpt({ Denom, Area, Colectivo, Mision, Funciones, ResAut:Responsabilidad, Tareas, Formacion, Condiciones});
  newDpt
    .save()
    .then(dpt => {
      console.log("New dpt created");
      res.redirect("/dpt");
    })
    .catch(error => {
      console.log(error)
      res.redirect("/dpt/new");
    });
});

//Get one DPT
router.get("/dpt/:id", ensureLoggedIn(), (req, res, next) => {
  dpt.findById(req.params.id).then(dpt => {
    res.render("dpts/dpt", { dpt });
  });
});


//Update a DPT
router.get("/dpt/edit/:id", ensureLoggedIn(), (req, res) => {
  dpt.findById(req.params.id).then(dpt => {
    res.render("dpts/editdpt", { dpt });
  });
});

/* Updating DPT in DB */
router.post("/dpt/edit/:id", ensureLoggedIn(), (req, res) => {
  const { Denom, Area, Colectivo, Mision, Funciones, TareasTipo1, TareasDedicacion1, TareasResultado1, TareasTipo2, TareasDedicacion2, TareasResultado2, TareasTipo3, TareasDedicacion3, TareasResultado3, TareasTipo4, TareasDedicacion4, TareasResultado4, TareasTipo5, TareasDedicacion5, TareasResultado5, FormacionTitulo, Idiomas, FormacionExperiencia, FormacionHabilidades, ResponsabilidadNivel, Colaboradores, SupervisionNivel, CondicionesTurnicidad, CondicionesColaboradores, CondicionesNocturnidad, CondicionesPeligro} = req.body;
  const Tareas = [{tipo: TareasTipo1, resultado: TareasResultado1, dedicacion: TareasDedicacion1}, {tipo: TareasTipo2, resultado: TareasResultado2, dedicacion: TareasDedicacion2}, {tipo: TareasTipo3, resultado: TareasResultado3, dedicacion: TareasDedicacion3}, {tipo: TareasTipo4, resultado: TareasResultado4, dedicacion: TareasDedicacion4}, {tipo: TareasTipo5, resultado: TareasResultado5, dedicacion: TareasDedicacion5}]
  const Formacion = {titulo: FormacionTitulo, idiomas: Idiomas, experiencia: FormacionExperiencia, habilidades: FormacionHabilidades}
  const Responsabilidad = {NivRes: ResponsabilidadNivel, Colaboradores: Colaboradores, NivSuperv: SupervisionNivel}
  const Condiciones = {turnicidad: CondicionesTurnicidad, Colaboradores: CondicionesColaboradores, nocturnidad: CondicionesNocturnidad, peligro: CondicionesPeligro}
  dpt.findByIdAndUpdate(req.params.id, { Denom, Area, Colectivo, Mision, Funciones, ResAut:Responsabilidad, Tareas, Formacion, Condiciones }).then(dpt => {
    res.redirect('/dpt');
  });
});

//Deleting a DPT
router.get("/dpt/delete/:id", ensureLoggedIn(), (req, res, next) => {
  dpt.findByIdAndRemove(req.params.id, () =>
    res.redirect("/dpt")
  );
});

module.exports = router;

