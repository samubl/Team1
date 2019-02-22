/*
 * GET userprofile page. Can contain code for a 
 * lot of event handling
 */

var data = require('../data.json');

exports.view = function(req, res){
  //console.log(data);
  data.username = "No User Yet";
  res.render('userprofile',data);
};