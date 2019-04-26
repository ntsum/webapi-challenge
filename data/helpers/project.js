const express = require('express');

const db = require('./projectModel.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const pro = await db.get();
        res.status(200).json(pro);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `This project ID does not exist`
        });
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const hub = await db.get(id).then(hub => {
            if (hub) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({
                    message: `This project ID does not exist`
                });
            } 
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `This project could not be retrieved`
        });
    }
});


router.get('/:id/actions', async (req, res) => {
     const {id} = req.params;
     const pros = await db.get(id);
    try {
        const action = await db.getProjectActions(id).then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: `No action was made`,
            });
        }
        })
    } catch (err) {
        res.status(500).json({
            message: `error getting action`,
        });
    }
});

router.post('/', async (req, res) => {
    const newProject = req.body;
    try {
        await db.insert(newProject);
            res.status(201).json({
                message: `New project created`
            })
        }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: `There was an error saving this project.`
    });
    }
});


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updateProject = req.body;
    try {
        const hubs = await db.get(id);
        await db.update(id, updateProject).then(hubs => { 
            if (hubs) {
            res.status(200).json(hubs);
        } else {
            res.status(404).json({
                message: `The project id ${id} does not exist`,
            })
            }
        }) 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `error has occurred`
        });
    }
});


router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const dele = await db.get(id);
        await db.remove(id).then(led => {
            if (dele) {
            res.status(200).json(dele)
        } else {
            res.status(404).end({
            message: `The project does not exist.`,
            })
        }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `The project could not be removed`
        });
    }
});

module.exports = router;