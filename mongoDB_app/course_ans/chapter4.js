// How many zips in the sample_training.zips dataset are neither over-populated nor under-populated? 
// In this case, we consider population of more than 1,000,000 to be over- populated and less than 5,000 to be under-populated.

db.zips.find({
    $nor: [
      { pop: {"$gt": 1000000 } }, { pop: { "$lt": 5000 } } ]}).count()


//   How many companies in the sample_training.companies dataset were either founded in 2004,
//    or in the month of October and either have the social category_code or web category_code?
db.companies.find({
    $and: [
        {
            $or: [{founded_year: 2004}, {founded_month: 10}]
        },
        {
            $or: [{category_code: "web"}, {category_code: "social"}]
        }
    ]
}).count()

// How many companies in the sample_training.
// companies collection have the same permalink as their twitter_username?

db.companies.find({ 
    $expr:  { $eq: ["$permalink", "$twitter_username"] }
}).count()
