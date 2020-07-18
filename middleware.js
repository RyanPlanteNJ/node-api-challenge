const Actions = require('./data/helpers/actionModel.js');
const Projects = require('./data/helpers/projectModel.js');

module.exports = {
  logger: function (req, res, next) {
    console.log(`${req.method} Request, ${req.url}, ${Date()}`);
    next();
  },

  validateProject: function (req, res, next) {
    const ProjectInfo = req.body;
    !ProjectInfo || ProjectInfo === {} ? res.status(400).json({ message: 'missing post data'}) : !ProjectInfo.name || ProjectInfo.name === '' ? res.status(400).json({ message: 'Missing required name field'}) : next();
  },

validateAction: function (req, res, next) {
  const ActionInfo = req.body;
  !ActionInfo || ActionInfo == {} ? res.status(400).json({ message: 'missing action data'}) : !ActionInfo.description || ActionInfo.decription === '' ? res.status(400).json({ message: 'Missing required description field'}) : next();
},

validateActionID: function (req, res, next) {
  Actions.get(req.params.id)
  .then(action => {
    if (action) {
      req.action = action;
      next()
    } else {
      res.status(400).json({
        message: 'The Action with the specified ID does not exist'
      });
    }
  })
  .catch(err => {
    res.status (500).json({message: "Something's broken master "});
  });
},

validateProjectID: function (req, res, next) {
    Projects.get(req.params.id)
    .then(project => {
      if(project) {
        req.project  = project
        next();
      } else {
        res.status(404).json({ message: 'The project with the specified ID does note exist' });
      }
    })
    .catch(next);
  },
};
