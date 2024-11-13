// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let SurveyModel = mongoose.Schema({
    Customer_Name:String,
    Product_Name:String,
    Purchase_Date:String,
    Description:String,
    Product_Price:String,

},
{
    collection:"Survey"
}
)
module.exports = mongoose.model('Survey',SurveyModel)