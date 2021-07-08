const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const {validateProjectID, validateProject, validateAction} = require('../middleware.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const projects = await Projects.get();
    if(projects.length) {
      res.status(200).json(projects);
    } else {res.status(404).json({
      message: 'No posts avaiable'
    });
    }
  } catch (error) {
    next (error)
  }
});

router.post('/', validateProject, async (req, res, next) => {
  const project = await Projects.insert(req.body)
  res.status(200).json(project);
});

router.post('/:id/actions', validateProjectID, validateAction, async (req, res) => {
  try {
    const newAction = await
    Actions.insert(req.body);
      if (newAction) {
      res.status(201).json(newAction);
    } else {
      res.status(400).json({
        message: 'Missing or incorrect Data'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something Broke'
    });
  }
});

router.get('/:id', validateProjectID, async (req, res, next) => {
  const project = await Projects.get(req.params.id);
  if(project){
    res.status(200).json(project);
  } else {
    console.log(error);
    res.status(500).json({
      error: "The project information could not be retrieved"
    });
  }
});

router.get('/:id/actions', validateProjectID, async (req, res, next) => {
  // do your magic!
  const projectActions = await Projects.getProjectActions(req.params.id);
  if (projectActions) {
    res.status(200).json(projectActions);
  } else {
    console.log(error);
    res.status(500).json({
      error: "User's Posts information could not be retreived"
    });
  }
});

router.delete('/:id', validateProjectID, async (req, res, next) => {
  const project = await Projects.remove(req.params.id);
  if (project)  {
    res.status(200).json(project)
  } else {
    res.status(500).json({ error: "The project could not be removed"});
  }
});

router.put('/:id', validateProjectID, async (req, res, next) => {
  const project = await Projects.update(req.params.id, req.body);
  if(project) {
     res.status(200).json(project);
  } else {
    res.status(500).json({
      error: "Project could not be updated"
    });
  }
});

module.exports = router;
