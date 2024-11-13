// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let SurveyModel = mongoose.Schema({
    First:String,
    Last:String,
    dob:String,
    Gender:String,
    Hair_color:String,
    Occupation:String,
    Nationality:String,
    Height_cm:String
},
{
    collection:"Survey"
}
)
module.exports = mongoose.model('Survey',SurveyModel)