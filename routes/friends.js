
/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function(req, res){
  console.log(data);
  console.log("friends");
  res.render('friends',data);
};