'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#addsource').click(addSource);

	// $('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addSource(e) {
	// Prevent following the link
	e.preventDefault();

	var form = document.getElementById("myForm");
    var input = document.createElement("input");
    input.type = "text";
    var br = document.createElement("br");
    form.appendChild(input);
    form.appendChild(br);

    var projectHTML = '<input>Enter Username</input>'
                        '<select>' +
                        '<option value="Spotify">Spotify</option>' +
                        '</select>';
    $('.sourceops').html(addProject(projectHTML));
	//added get statement
	//$.get("/project/"+idNumber, callback);

}

function callback(result) {
	console.log(result);
	$('.details').html(addProject(result))

}

function addProject(result) {
	var projectHTML = '<p>' + result['title'] + '</p>' + '<p>' + result['date'] + 
	'</p><p><img src="' + result['image'] + '" style="width:50%; float:left; padding-right:5px;">' + result['summary'] + '</p>';
	return (projectHTML);
  }
