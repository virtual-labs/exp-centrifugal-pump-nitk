
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
    question: "In a centrifugal pump, the regulating valve is provided on the ",
    answers: {
      a: "Casing",
      b: "Delivery pipe",
      c: "Suction pipe",
      d: "Impeller"
    },
    correctAnswer: "b"
  },

  {
    question: "Which type of vanes is suitable for high speed runners? ",
    answers: {
      a: "Forward facing vanes",
      b: "Radial vanes",
      c: "Backward facing vanes",
      d: "None of the above"
    },
    correctAnswer: "c"
  },

  {
    question: "The efficiency of a pump is generally less than that of a turbine.(Say true or false)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },
  {
    question: "The volute casing of a centrifugal pump has which of the following functions?<br>1.Eliminating loss of head due to change in velocity after exit from Impeller<br>2.Directs the flow towards the delivery pipe<br>3.Converts a part of the velocity head to pressure head<br>4.Gives a constant velocity of flow<br>",
    answers: {
      a: "1, 2 and 4",
      b: "2 and 3 only",
      c: "1 and 4 only",
      d: "2 and 4 only"
    },
    correctAnswer: "b"
  },
  {
    question: "Which one of the following is the correct statement for a given centrifugal pump?",
    answers: {
      a: "The discharge varies directly as the speed",
      b: "The head varies inversely as the speed",
      c: "The power varies as the square of the speed",
      d: "The discharge varies as the square of the speed"
    },
    correctAnswer: "a"
  }
];





// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
