var backButton = document.querySelector('#backButton');
var clearButton = document.querySelector('#clearButton');
var emptyChild;

function initilize()
{
    backButton.addEventListener('click', goBack);
    clearButton.addEventListener('click', clearScores);

    loadScores();
}

function loadScores()
{
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if(!highscores || highscores.length === 0)
    {
        addEmptyChild();
        return;
    }

    //Sort highscores by the Score value
    highscores.sort((firstItem, secondItem) => secondItem.playerScore - firstItem.playerScore);

    for(var i = 0; i < highscores.length; i++)
    {
        var list = document.createElement("li");
        list.className = "list-group-item list-group-item-primary";
        var nameP = document.createElement("p");
        nameP.textContent = (i+1) + ". " + highscores[i].playerName + ": " + highscores[i].playerScore;
        list.appendChild(nameP);
        document.querySelector(".highscoreList").appendChild(list);
    }
}

function goBack()
{
    location.href = "./index.html";
}

function clearScores()
{
    localStorage.removeItem("highscores");
    document.querySelector(".highscoreList").innerHTML = "";
    addEmptyChild();
}

function addEmptyChild()
{
    emptyChild= document.createElement("li");
    var nameP = document.createElement("p");
    nameP.textContent = "No current high scores";
    emptyChild.className = "list-group-item list-group-item-primary";

    emptyChild.appendChild(nameP);
    document.querySelector(".highscoreList").appendChild(emptyChild);
}

function removeEmptyChild()
{
    document.querySelector(".highscoreList").removeChild(emptyChild);
}

initilize();