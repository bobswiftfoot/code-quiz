var startButton = document.querySelector('#startQuiz');
var startScreen = document.querySelector('#startScreen');
var questionsScreen = document.querySelector('#questionsScreen');
var resultsScreen = document.querySelector('#resultsScreen');
var resultSection = document.querySelector('#resultSection');
var timerSpan = document.querySelector('.timerSpan');

var questions = [   {q:"Commonly used data types DO Not inclue:", a1:"strings", a2:"booleans", a3:"alerts", a4:"numbers", a:2},  
                    {q:"The condition if an if / else statement is enclosed with ________.", a1:"quotes", a2:"curly brackets", a3:"parenthesis", a4:"square brackets", a:2},  
                    {q:"Arrays in JavaScript can be used to store _______.", a1:"numbers and strings", a2:"other arrays", a3:"booleans", a4:"all of the above", a:3},  
                    {q:"String values must be enlosed within _______ when being assigned to variables.", a1:"commas", a2:"curly brackets", a3:"quotes", a4:"parenthesis", a:2},  
                    {q:"A very useful tool used during development and debugging for printing content to the debugger is:", a1:"JavaScript", a2:"terminal/bash", a3:"for loops", a4:"console.log", a:3}];

var currentQuestion = 0;
var score = 0;
var timer = 60;

function initilize()
{
    startButton.addEventListener('click', startGame);
    questionsScreen.querySelector("#answer1").addEventListener('click', answerQuestion);
    questionsScreen.querySelector("#answer2").addEventListener('click', answerQuestion);
    questionsScreen.querySelector("#answer3").addEventListener('click', answerQuestion);
    questionsScreen.querySelector("#answer4").addEventListener('click', answerQuestion);
    resultsScreen.querySelector("#resultSubmit").addEventListener('click', submitScore);
}

function startGame()
{
    timerSpan.textContent = timer;

    var timeInterval = setInterval(function() 
    {
        timerSpan.textContent = timer;

        if(!timer)
        {
            displayResults();
            clearInterval(timeInterval);
            resultSection.setAttribute("style", "display:block");  
            resultSection.querySelector("p").textContent = "Times up!";
            return;
        }
    
        timer--;
    }, 1000);
    displayQuestions();
}

function displayQuestions()
{
    var question = questions[currentQuestion];
    questionsScreen.querySelector(".question").textContent = question.q;
    questionsScreen.querySelector("#answer1").textContent = question.a1;
    questionsScreen.querySelector("#answer2").textContent = question.a2;
    questionsScreen.querySelector("#answer3").textContent = question.a3;
    questionsScreen.querySelector("#answer4").textContent = question.a4;
    startScreen.setAttribute("style", "display:none");
    questionsScreen.setAttribute("style", "display:block");  
}

function answerQuestion()
{
    var correctAnswer = questions[currentQuestion].a;
    var answer = this.id.replace("answer", "");
    answer = parseInt(answer) - 1;
    resultSection.setAttribute("style", "display:block");  
    if(correctAnswer === answer)
    {
        score++;
        resultSection.querySelector("p").textContent = "Correct";
    }
    else
        resultSection.querySelector("p").textContent = "Wrong";


    currentQuestion++;
    if(currentQuestion < questions.length)
        displayQuestions();
    else
        displayResults();
}

function displayResults()
{
    questionsScreen.setAttribute("style", "display:none");
    resultsScreen.setAttribute("style", "display:block");  

    resultsScreen.querySelector("span").textContent = score;
}

function submitScore()
{
    var name = resultsScreen.querySelector("#initals").value;
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if(!highscores)
    {
        highscores = [];
    }
    highscores.push(
        {
            playerName:name,
            playerScore:score,
        });

    localStorage.setItem("highscores", JSON.stringify(highscores));
    
    location.href = "./highscores.html";
}

initilize();