/*
 * GET discover page. Can contain code for a 
 * lot of event handling
 */
var data = require('../data.json');

exports.view = function(req, res){
  console.log(data);
  console.log("discover");
  res.render('discover',data);
};