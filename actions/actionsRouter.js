const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const Projects = require ('../data/helpers/projectModel.js')
const {validateAction, validateActionID} = require('../middleware.js')

const router = express.Router();


router.get('/', async (req, res, next) => {
  try{
    const actions = await Actions.get();
    if(actions.length) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({
        message: "No actions available" });
      }
    } catch(error) {
      next(error)
    }
  });

  router.get('/:id', validateActionID, async (req, res, next) => {
    // do your magic!
    const actions = await Actions.get(req.params.id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      console.log(error);
      res.status(500).json({
        error: "This Project's actions could not be retreived"
      });
    }
  });

  router.put('/:id', validateActionID, validateAction, async (req, res, next) => {
    const editActionInfo = await Actions.update(req.params.id, req.body)
      if (editActionInfo) {
        res.status(201).json(editActionInfo);
      } else {
        res.status(500).json({ error: 'Somethings going on and we gotta figure out what'})
      }
  });

  router.delete('/:id', validateActionID, async (req, res, next) => {
      const action = await Actions.remove(req.params.id);
      if (action) {
        res.status(200).json(req.body)
      } else {
        console.log(error);
        res.status(500).json({ error: "The action could not be removed"
        });
      }
    });

  module.exports = router;
