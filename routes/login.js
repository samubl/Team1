/*
 * GET login page. Can contain code for a 
 * lot of event handling
 */
var data = require('../data.json');

exports.view = function(req, res){
  console.log(data);
  //console.log("login");
  data["favoritesAlt"] = false;
  res.render('login',data);
};

exports.viewAlt = function(req, res){
  console.log(data);
  //console.log("login");
  data["favoritesAlt"] = true;
  res.render('login',data);
};