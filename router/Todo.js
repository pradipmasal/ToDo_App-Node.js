const express = require('express')

const router = express.Router()
// importing model
const tasks = require('../models/tasks')

// Add a task
router.post('/save',async(req, res)=>{
    // console.log(req.body.task)
    const input =  new tasks({
        task: req.body.task
    })
    try{
        const a1 = await input.save()
        res.redirect('/todo/');
    }catch(err){
        res.send(err)
    }
})

//Getting a task
router.get('/',async(req, res)=>{

    // console.log("I am working...")
    try{
        const data = await tasks.find({ isCompleted: false })
        const completedTasks = await tasks.find({ isCompleted: true });
        // res.json(data);
        res.render('index', { data, completedTasks })
    }catch(err){
        res.send(err)
    }
})

//Update a task
router.post('/update/:id',async(req, res)=>{
    const data = await tasks.findById(req.params.id)

    const input = await tasks.updateOne(
        {_id: req.params.id},
        {$set :{task: req.body.task}}
    );
    res.redirect('/todo/')
})

//Delete a task
router.get('/delete/:id',async(req, res)=>{
    try{
        const data = await tasks.findByIdAndDelete(req.params.id);
        res.redirect('/todo/')
    }catch(err){
        res.send(err)
    }
    
})

// to edit task
router.get('/edit/:id',async(req, res)=>{
    const id = req.params.id;
    const data = await tasks.findById(id);
    res.render('edit', {data})
})

//iscompleted
router.get('/completed/:id', async(req,res)=>{
    // const id = req.params.id
    //const data = await tasks.findById(id)

    const input = await tasks.updateOne(
        {_id : req.params.id},
        {$set :{isCompleted: true}}
    )   
    res.redirect('/todo/')
})

//mark as undone
router.get('/undone/:id', async(req, res)=>{
    const input = await tasks.updateOne(
        {_id : req.params.id},
        {$set :{isCompleted: false}}
    )   
    res.redirect('/todo/')
})

module.exports = router