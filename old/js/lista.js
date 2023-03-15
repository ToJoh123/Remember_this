		// Add a new item to the list
		function newElement() {
			var li = document.createElement("li");
			var inputValue = document.getElementById("myInput").value;
			var text = document.createTextNode(inputValue);
			li.appendChild(text);
			if (inputValue === '') {
				alert("Please enter a task!");
			} else {
				document.getElementById("myUL").appendChild(li);
			}
			document.getElementById("myInput").value = "";
		}