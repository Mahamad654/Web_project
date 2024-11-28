var express = require('express');
var router = express.Router();
let Survey = require('../model/survey')

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// CRUD
// Read Operation --> Get route for the survey list
router.get('/',async(req,res,next)=>{
    try{
        const SurveyList = await Survey.find();
        res.render('Survey/list',{
            title:'Survey',
            displayName:req.user ? req.user.displayName:'',
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
            title:"Add Survey",
            displayName:req.user ? req.user.displayName:''
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
            "Customer_Name":req.body.Customer_Name,
            "Product_Name":req.body.Product_Name,
            "Purchase_Date":req.body.Purchase_Date,
            "Description":req.body.Description,
            "Product_Price":req.body.Product_Price,

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
                displayName:req.user ? req.user.displayName:'',
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
            "Customer_Name":req.body.Customer_Name,
            "Product_Name":req.body.Product_Name,
            "Purchase_Date":req.body.Purchase_Date,
            "Description":req.body.Description,
            "Product_Price":req.body.Product_Price,

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