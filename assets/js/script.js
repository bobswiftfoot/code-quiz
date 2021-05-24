var startButton = document.querySelector('#startQuiz');
var startScreen = document.querySelector('#startScreen');
var questionsScreen = document.querySelector('#questionsScreen');
var resultsScreen = document.querySelector('#resultsScreen');
var resultSection = document.querySelector('#resultSection');
var timerSpan = document.querySelector('.timerSpan');

var questions = [   {q:"Question 1", a1:"Answer 1", a2:"Answer 2", a3:"Answer 3", a4:"Answer 4", a:0},  
                    {q:"Question 2", a1:"Answer 1", a2:"Answer 2", a3:"Answer 3", a4:"Answer 4", a:2},  
                    {q:"Question 3", a1:"Answer 1", a2:"Answer 2", a3:"Answer 3", a4:"Answer 4", a:1},  
                    {q:"Question 4", a1:"Answer 1", a2:"Answer 2", a3:"Answer 3", a4:"Answer 4", a:1},  
                    {q:"Question 5", a1:"Answer 1", a2:"Answer 2", a3:"Answer 3", a4:"Answer 4", a:3}];

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