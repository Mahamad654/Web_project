var express = require('express');
var router = express.Router();
let Survey = require('../model/survey')
// CRUD
// Read Operation --> Get route for the survey list
router.get('/',async(req,res,next)=>{
    try{
        const SurveyList = await Survey.find();
        res.render('Survey/list',{
            title:'Survey',
            SurveyList:SurveyList
        })
    }
    catch(err){
        console.error(err)
        res.render('Survey/list',{
            error:'Error on Server'})
    }
})
// Create Operation --> Get route for Add list
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Survey/add', {
            title:"Add Survey"
        });
    }
    catch (err) {
        console.error(err)
        res.render('Survey/list', {
            error: 'Error on Server'})
    }
});
// Read Operation --> Post route for processing the Add  page
router.post('/add',async(req,res,next)=>{
    try{
        let newSurvey = Survey({
            "First":req.body.First,
            "Last":req.body.Last,
            "dob":req.body.Last,
            "Gender":req.body.Last,
            "Hair_color":req.body.Last,
            "Occupation":req.body.Occupation,
            "Nationality":req.body.Nationality,
            "Height_cm":req.body.Height_cm,

        });
        Survey.create(newSurvey).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on server'})
    }
});
// Update Operation --> Get route for Edit page
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const SurveyToEdit = await Survey.findById(id);
        res.render('Survey/edit', 
            {
                title:'Edit Survey',
                Survey:SurveyToEdit
            }
        )
    }
    catch(err){
        console.error(err);
        next(err);
    }
});
// Update Operation --> Post route for processing Edit page
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updatedSurvey = Survey({
            "_id":id,
            "First":req.body.First,
            "Last":req.body.Last,
            "dob":req.body.dob,
            "Gender":req.body.Gender,
            "Hair_color":req.body.Hair_color,
            "Occupation":req.body.Occupation,
            "Nationality":req.body.Nationality,
            "Height_cm":req.body.Height_cm,

        })
        Survey.findByIdAndUpdate(id,updatedSurvey).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Survey/list', {
            error:'Error on server'
        })
    }
});
// Delete Operation --> Get route for deletion
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Survey.deleteOne({_id:id}).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Survey/list', {
            error:'Error on server'
        })
    }
});
module.exports = router;