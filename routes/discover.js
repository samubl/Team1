
/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function(req, res){
  console.log(data);
  console.log("discover");
  res.render('discover',data);
};