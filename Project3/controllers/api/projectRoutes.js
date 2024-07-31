// controllers/api/projectRoutes.js
const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new project
router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.user.id,
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get all projects
router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single project by ID
router.get('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a project by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedProject = await Project.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    if (!updatedProject[0]) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a project by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// const router = require('express').Router();
// const { Project } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
