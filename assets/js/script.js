var startButton = document.querySelector('#startQuiz');
var startScreen = document.querySelector('#startScreen');
var questionsScreen = document.querySelector('#questionsScreen');
var resultsScreen = document.querySelector('#resultsScreen');

function main()
{
    startButton.addEventListener('click', startGame);
}

function startGame()    
{
    //startScreen.setAttribute("style", "display:none");
    //questionsScreen.setAttribute("style", "display:block");
    //resultsScreen.setAttribute("style", "display:block");
}

main();