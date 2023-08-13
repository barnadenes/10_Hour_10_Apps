const QuizData = [
    {
        question: "How many meds am I taking?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        correct: "c",
    },
    {
        question: "Most used programming language?",
        a: "English",
        b: "Python",
        c: "C#",
        d: "JS",
        correct: "d",
    },
    {
        question: "President of the US?",
        a: "Obama",
        b: "Sleepy Joe",
        c: "Trump",
        d: "Kanye",
        correct: "b",
    },
    {
        question: "Who wrote the song \"Mary on a Cross?\"",
        a: "Nightwish",
        b: "Lil'Pump",
        c: "Ghost",
        d: "Moikaloop",
        correct: "c",
    },

]

let question = document.querySelector("#question-text");
let a = document.querySelector("#qa");
let b = document.querySelector("#qb");
let c = document.querySelector("#qc");
let d = document.querySelector("#qd");
let correct = QuizData[1].correct;
let i = 0;
let inputSet = document.querySelectorAll('.input-check');
const maxScore =  4;
let score = 0;
let isTrue = false;

function init() {
    question.innerHTML = QuizData[0].question;
    a.innerHTML = QuizData[0].a;
    b.innerHTML = QuizData[0].b;
    c.innerHTML = QuizData[0].c;
    d.innerHTML = QuizData[0].d;
}

function nextQuestion() {
    isChecked(i);
    i ++;
    if(isTrue === false) {
        return;
    }
    else if(i == 4) {
        let hideEl = document.querySelectorAll('.hide');
        question.innerHTML = `Your score is ${score} / ${maxScore} `;
        for (let i = 0; i < hideEl.length; ++i) {
            hideEl[i].style.display = "none";
          }
          return;
    }
    else {
        question.innerHTML = QuizData[i].question;
        a.innerHTML = QuizData[i].a;
        b.innerHTML = QuizData[i].b;
        c.innerHTML = QuizData[i].c;
        d.innerHTML = QuizData[i].d;   
    }
}

function isChecked(num) {
    let selected = undefined;

    inputSet.forEach(input => {
        if(input.checked === true) {
            selected = input.id;
            isTrue = true;
            if(selected == QuizData[num].correct) {
                score++;
            }
            else {
                score = score;
            }        
        }
    });

    if(!isTrue) {
        alert("Please select an option!");
    }
}

init();



