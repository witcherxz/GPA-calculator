// const { basename } = require("path/posix");

const gpaM4 = 4 / 100; // GPA multiplayer for scale 4
const gpaM5 = 5 / 100; // GPA multiplayer for scale 5

const inputHours = document.querySelector("#prevhour");
const inputGPA = document.querySelector("#GPA");

// Radio form
const rad4 = document.querySelector("#rad4"); // Radio 4.00
const rad5 = document.querySelector("#rad5"); // Radio 5.00

const calcBtn = document.querySelector("#calcBtn");
const addNewRow = document.querySelector("#addInputRow");
const inputForm = document.querySelector(".inputForm");
const inputRow = document.querySelector("#inputRow");

const resulte = document.querySelector("#resulte");
const termResulte = document.querySelector("#termResulte");

// Calculate Event
calcBtn.addEventListener("click", () => {
  const gradeInputs = document.querySelectorAll(".grade__input");
  const creditInputs = document.querySelectorAll(".credit__input");

  let base = rad4.checked ? gpaM4 : gpaM5;
  let prevGPA = 0;
  let prevHours = 0;
  let semesterGPA = 0;
  let currentHours = 0;
  let cumulativeGPA = 0;

  let subjects = [];

  if (inputGPA.value !== "" && inputHours.value !== "") {
    prevGPA = Number(inputGPA.value);
    prevHours = Number(inputHours.value);
    
    for (let i = 0; i < gradeInputs.length; i++) {
      if (gradeInputs[i].value !== "" && creditInputs[i].value !== "") {
        let grade = Number(gradeInputs[i].value);
        let credit = Number(creditInputs[i].value);
        subjects.push({ grade: grade, credit: credit });
        currentHours += credit;
      }
    }

    semesterGPA = semesterGpaCalculator(subjects, currentHours, base);
    cumulativeGPA = cumulativeGPACalculator(
      prevGPA,
      prevHours,
      semesterGPA,
      currentHours,
      base
    );
  }

  resulte.textContent = Math.round(cumulativeGPA * 100) / 100;
  termResulte.textContent = Math.round(semesterGPA * 100) / 100;
});

//Add new input row Event
addNewRow.addEventListener("click", () => {
  const newChild = inputRow.cloneNode(true);
  const newChildFields = newChild.querySelectorAll("input");
  for (let i = 0; i < newChildFields.length; i++) {
    newChildFields[i].value = "";
  }
  inputForm.appendChild(newChild);
});

// Get the credit of the grade
function toCredit(grade) {
  let gradBase = Math.floor(grade / 10) * 10;
  let roundedGrade = grade % 10 >= 5 ? gradBase + 10 : gradBase + 5;
  roundedGrade = roundedGrade > 100 ? 100 : roundedGrade;

  return roundedGrade;
}

function semesterGpaCalculator(subjects, hours, base) {
  let semesterGPA = 0;
  let points = 0;

  subjects.forEach((subject) => {
    grade = toCredit(subject["grade"]);

    credit = subject["credit"];
    point = grade * base;
    points += Math.floor(point * credit);
  });
  semesterGPA = points / hours;
  return semesterGPA;
}

function cumulativeGPACalculator(prevGPA, prevhours, currentGPA, currenthours) {
  let totalHours = prevhours + currenthours;
  let resultGPA =
    (prevGPA * prevhours + currentGPA * currenthours) / totalHours;

  return resultGPA;
}
