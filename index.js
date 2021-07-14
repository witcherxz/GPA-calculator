const gpaM4 = 4/100; // GPA multiplayer for scale 4
const gpaM5 = 5/100; // GPA multiplayer for scale 5

const prevhours = document.querySelector('#prevhour');
const gpa = document.querySelector('#GPA');

// Radio form
const rad4 = document.querySelector('#rad4'); // Radio 4.00
const rad5 = document.querySelector('#rad5'); // Radio 5.00



const calcBtn = document.querySelector('#calcBtn');
const addNewRow = document.querySelector('#addInputRow');
const inputForm = document.querySelector('.inputForm');
const inputRow = document.querySelector('#inputRow');


const resulte = document.querySelector('#resulte');
const termResulte = document.querySelector('#termResulte');

let newGPA= 0;
let newHours= 0 ;
let startHours = 0;
let termHours = 0 ;
let termGPA = 0;


let grades = [0];
let credits = [0];


// NOTE: Calculate Event
calcBtn.addEventListener('click',function(){
    const gradeInputs = document.querySelectorAll('.grade__input');
    const creditInputs = document.querySelectorAll('.credit__input');

    let selectedType = (rad4.checked) ? gpaM4 : gpaM5;

    if(gpa.value !== '' && prevhours.value !== '') { 
        newGPA = Number(gpa.value) ;
        newHours = Number(prevhours.value);
        startHours = newHours;
        startGPA = newGPA;
    }
    for (let i = 0; i < gradeInputs.length; i++) {
        if(gpa.value !== '' && prevhours.value !== '' && gradeInputs[i].value !== '' && creditInputs[i].value !== ''){
            gpaCalculator(
                newGPA,
                newHours,
                gradeInputs[i].value,
                creditInputs[i].value,
                selectedType
            );
        }
    }

    resulte.textContent = Math.round( newGPA * 1000) / 1000;
    termResulte.textContent = Math.round( termGPA * 1000) / 1000;
});

//NOTE: Add new input row Event
function newRow(){
    const newChild = inputRow.cloneNode(true);
    const newChildFields = newChild.querySelectorAll('input');
    for (let i = 0; i < newChildFields.length; i++) {
        newChildFields[i].value = '';
    }
    inputForm.appendChild(newChild);
}

addNewRow.addEventListener('click', newRow);

//NOTE: Calculation Section
function roundGrade(grade) {
    
    let gradBase = Math.floor(grade / 10) * 10 
    let roundedGrade = ( grade % 10 ) >= 5 ? ( gradBase + 10 ) : ( gradBase + 5 ) ;
    roundedGrade = (roundedGrade) > 100 ? 100 : roundedGrade; 
    
    return roundedGrade;
}

function gpaCalculator( gpa, prevhour, grade, credit, gpaMultiplayer) {
    grade = Number(grade);
    credit = Number(credit);
    
    grade = roundGrade(grade);
    let gpaPoints = (gpa / gpaMultiplayer) * prevhour;
    let subjectPoints = grade * credit;

    let totalHours = credit + prevhour;
    let totalPoints = gpaPoints + subjectPoints;

    let totalGpa = (totalPoints / ( totalHours )) * gpaMultiplayer;
    termHours = totalHours - startHours;
    let startGPAPoints = (startGPA / gpaMultiplayer) * startHours; 
    let startPoints = totalPoints - startGPAPoints;
    termGPA = ((startPoints)/ termHours) * gpaMultiplayer;
    newGPA = totalGpa;
    newHours =totalHours;

}



