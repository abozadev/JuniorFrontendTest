

function getData() {

    var xhr = new XMLHttpRequest();

    //Resets data
    var node = document.getElementById("reposTable");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    //USER REQUEST
    var username = document.getElementById('Input').value;
    xhr.open("GET", "https://api.github.com/users/" + username, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            document.getElementById('username').innerHTML = "@" + response.login;
            document.getElementById('name').innerHTML = response.name;
            document.getElementById('description').innerHTML = response.bio;
            document.getElementById("image").src= response.avatar_url;
            document.getElementById('user').style.display = "block";
            document.getElementById("error").style.display = 'none';
        }
        else if (this.readyState == 4 && this.status == 404) {
            //show error
            document.getElementById('user').style.display = "none";
            document.getElementById("error").style.display = 'block';
        }
    };

    // REPOS REQUEST
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/" + username + "/repos", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            for (var i = 0; i < response.length; i++) {

                var row = document.createElement("TR");

                var repo = document.createElement("TD");
                var fork = document.createElement("TD");
                var stars = document.createElement("TD");
                var starsImage = document.createElement("TD");
                var forkImage = document.createElement("TD");

                var imgStars = document.createElement("IMG");
                var imgForks = document.createElement("IMG");

                repo.appendChild(document.createTextNode(response[i].name));
                stars.appendChild(document.createTextNode(response[i].stargazers_count));
                fork.appendChild(document.createTextNode(response[i].forks));

                imgForks.setAttribute("id", "imageForks");
                imgForks.setAttribute("src", "./img/fork.svg");
                imgForks.setAttribute("width", "15");

                imgStars.setAttribute("id", "imageForks");
                imgStars.setAttribute("src", "./img/star.svg");
                imgStars.setAttribute("width", "16");

                repo.setAttribute("class" , "repo");

                fork.setAttribute("class", "numTable");
                stars.setAttribute("class", "numTable");

                starsImage.setAttribute("class", "imgTable");
                forkImage.setAttribute("class", "imgTable");

                starsImage.appendChild(imgStars);
                forkImage.appendChild(imgForks);


                row.appendChild(repo);
                row.appendChild(stars);
                row.appendChild(starsImage);
                row.appendChild(fork);
                row.appendChild(forkImage);

                document.getElementById("reposTable").appendChild(row);

            }
            document.getElementById("reposTable").style.display = '';

        }
        else if (this.readyState == 4 && this.status == 404) {
            //show error
        }
    };




}
