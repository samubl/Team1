'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $('#addsource').click(chooseSource);
    $('#submittedusername').click(addSource);

	// $('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function chooseSource(e) {
	// Prevent following the link
    e.preventDefault();
    
    $('.sourceops').show();
    //add submitting html
    /*var projectHTML =   '<form>' +
                            '<select>' +
                                '<option value="spotify">Spotify</option>' +
                                '<option value="apple music">Apple Music</option>' +
                            '</select>' +
                            'Enter username: <input type="text" id="Enter username"><br>' +
                            '<input type="submit" id="submittedusername"><br>' +
                        '</form>';
    console.log(projectHTML);
    //$('.sourceops').html(projectHTML);*/
	//added get statement
	//$.get("/project/"+idNumber, callback)
}

function addSource(e) {
    e.preventDefault();

    //accept user inout
    var username = document.getElementById("Enter username").value;
    console.log(username);

    $('.sourceops').hide();

    $('.mediums').show();
    //TODO update data.json
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
