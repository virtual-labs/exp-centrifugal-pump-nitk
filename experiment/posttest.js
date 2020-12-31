
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------
const myQuestions = [
  {
    question: "Centrifugal Pump",
    answers: {
      a: "The centrifugal pump is suitable for large discharge and smaller heads",
      b: "The centrifugal pump requires less floor area and simple foundation as compared to reciprocating pump",
      c: "The efficiency of centrifugal pump is less as compared to reciprocating pump",
      d: "All the above"
    },
    correctAnswer: "d"
  },

  {
    question: "Delivery valve while starting centrifugal pump is kept ",
    answers: {
      a: "Fully open",
      b: "Fully closed",
      c: "Half open",
      d: "In any position"
    },
    correctAnswer: "b"
  },

  {
    question: "The correct sequence of the centrifugal pump components through which the fluid flows is",
    answers: {
      a: "Impeller, Suction pipe, Foot valve and strainer, Delivery pipe",
      b: "Foot valve and strainer, Suction pipe, Impeller, Delivery pipe",
      c: "Impeller, Suction pipe, Delivery pipe, Foot valve strainer",
      d: "Suction pipe, Delivery pipe, Impeller, Foot valve and strainer"
    },
    correctAnswer: "b"
  },
  {
    question: "A centrifugal pump gives maximum efficiency when its blades are ____",
    answers: {
      a: "Bent forward",
      b: "Bend backward",
      c: "Straight",
      d: "Wave shaped"
    },
    correctAnswer: "b"
  },
  {
    question: "The net positive suction head (NPSH) of a centrifugal pump is defined as the sum of the velocity head and the pressure head at the",
    answers: {
      a: "Suction",
      b: "Discharge",
      c: "Suction minus vapour pressure of the liquid at suction temperature",
      d: "Discharge minus vapour pressure of the liquid at the discharge temperature",
    },
    correctAnswer: "c"
  }
];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
