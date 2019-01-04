/*
	GET THE DATA - HAVING TROUBLE WITH THE CORS PROTOCOL. PROBABLY A SERVER SIDE PROBLEM

	TESTS TAKEN BY ADDING OPTIONS ON AJAX CALL
		
		adding on the url &callback=?

		crossDomain: true,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
		
*/


$(document).ready(function() {
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);

	function readSingleFile(e) {
	  var file = e.target.files[0];
	  if (!file) {
	    return;
	  }
	  var reader = new FileReader();
	  reader.onload = function(e) {
	    var contents = e.target.result;
	    parseRSS(contents);
	  };
	  reader.readAsText(file);
	}

	function addContent(item) {
		let title = "<h3 class='title'>"+item.querySelector('title').textContent+"</h3>";
		let description = "<p>"+item.querySelector('description').textContent+"<p>";
		let creator = "<h6 class='creator'>"+item.querySelector('creator').textContent+"</h6>";
		let pubDate = "<h6>"+new Date(item.querySelector('pubDate').textContent)+"</h6>";
		const info = "<div>"+title+creator+pubDate+description+"</div><div class='breakpoint'></div>";
		$('#rss-feed').append(info);
	}

	function parseRSS(data) {
		const domParser = new DOMParser();
		let doc = domParser.parseFromString(data,'application/xhtml+xml');
		let i = 1;
		doc.querySelectorAll('item').forEach((item) => {
			if(i++ > 10){
				return;
			} else {
				addContent(item);	
			}
		});
	}
});

