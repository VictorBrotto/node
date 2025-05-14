const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/', professorController.getAll);
router.get('/:id', professorController.getId);
router.put('/:id', professorController.put);
router.get('/:id/turmas', professorController.getClass);
router.post('/:id/turmas', professorController.post);
router.get('/departamento/:departamento', professorController.getDep);
router.delete('/:id', professorController.delete);

module.exports = router;
