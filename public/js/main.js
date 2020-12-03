/* * * * * * Initialize facts and answers * * * * * */
// the facts object initialized with random values
const facts = {
  ageGroup: "children",
  gender: "male",
  familyHistory: "N",
  smokingHistory: "N",
  duration: ">1 week, <4weeks",
  chestPain: "Y",
  cough: "productive",
  coughingUpBlood: "N",
  fever: "N",
  rapidBreathing: "N",
  rapidHeartbeat: "N",
  shortnessOfBreath: "Y",
  wheezing: "Y",
};

const answers = {
  name: undefined,
  age: undefined,
  gender: undefined,
  familyHistory: undefined,
  smokingHistory: undefined,
  chestPain: undefined,
  cough: undefined,
  coughingUpBlood: undefined,
  fever: undefined,
  rapidBreathing: undefined,
  shortnessOfBreath: undefined,
  rapidHeartbeat: undefined,
  wheezing: undefined,
  duration: undefined
};

const diseaseDescriptions = [
  {
    code: 'acuteBronchitis',
    name: 'Acute Bronchitis',
  },
  {
    code: 'asthma',
    name: 'Asthma',
  },
  {
    code: 'bronchiectasis',
    name: 'Bronchiectasis',
  },
  {
    code: 'bronchiolitis',
    name: 'Bronchiolitis'
  },
  {
    code: 'copd',
    name: 'COPD'
  },
  {
    code: 'commonCold',
    name: 'Common Cold'
  },
  {
    code: 'covid-19',
    name: 'COVID 19'
  },
  {
    code: 'croup',
    name: 'Croup',
  },
  {
    code: 'cysticFibrosis',
    name: 'Cystic Fibrosis'
  },
  {
    code: 'influenza',
    name: 'Influenza'
  },
  {
    code: 'lungCancer',
    name: 'Lung Cancer'
  },
  {
    code: 'occupationalLungDiseases',
    name: 'Occupational Lung Diseases'
  },
  {
    code: 'pertussis',
    name: 'Pertussis'
  },
  {
    code: 'pneumonia',
    name: 'Pneumonia'
  },
  {
    code: 'rhinosinusitis',
    name: 'Rhinosinusitis'
  },
  {
    code: 'tuberculosis',
    name: 'Tuberculosis'
  }
];

/* * * * * * Attach event listeners to all submit buttons * * * * * */
const nameInputEl = document.getElementById('nameInput');
document.querySelector('button[data-answer-type="text"]').addEventListener('click', (e) => {
  if (nameInputEl.value === "")
    document.getElementById("nameInputReminder").style.display = "block";
  else {
    answers.name = nameInputEl.value;
    // go to next question and play animations
    questionEls[1].classList.add("question-container--slide-out");
    // slide in next question
    questionEls[2].classList.remove("question-container--on-standby");
    questionEls[2].classList.add("question-container--slide-in");
  }
})

const ageInputEl = document.getElementById('ageInput');
document.querySelector('button[data-answer-type="number"]').addEventListener('click', (e) => {
  const age = parseInt(ageInputEl.value);
  if (Number.isInteger(age) && age > 0 && age < 150) {
    answers.age = age;
    if (answers.age <= 1)
      facts.ageGroup = 'infants';
    else if (answers.age <= 13)
      facts.ageGroup = 'children';
    else if (answers.age <= 35)
      facts.ageGroup = 'youngAdults';
    else if (answers.age <= 55)
      facts.ageGroup = 'middleAged';
    else
      facts.ageGroup = 'elderly';
    
    // go to next question and play animations
    questionEls[2].classList.add("question-container--slide-out");
    // slide in next question
    questionEls[3].classList.remove("question-container--on-standby");
    questionEls[3].classList.add("question-container--slide-in");
  } else
    document.getElementById("ageInputReminder").style.display = "block";
})


const questionEls = Array.from(document.querySelectorAll(".question-container"));

for (let i = 1; i < questionEls.length; i++) {
  questionEls[i].classList.add("question-container--on-standby");
}

// neat little function for getting current question: https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

// Event listeners for submit buttons of Choice questions
const choiceBtns = Array.from(document.querySelectorAll('button[data-answer-type="choice"]'));
choiceBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    // skip the first button because it is in Introduction, not a question
    if (i != 0) {
      const question = btn.dataset.question;
      const answer = btn.dataset.choice;
      facts[question] = answer;
      answers[question] = answer;
    }

    // play animations
    const currentQuestion = findAncestor(btn, "question-container");
    const currentCardNumber = parseInt(currentQuestion.dataset.number);
    const nextQuestion = document.querySelector(`div[data-number="${currentCardNumber + 1}"]`);
    currentQuestion.classList.add("question-container--slide-out");
    // slide in next question
    nextQuestion.classList.remove("question-container--on-standby");
    nextQuestion.classList.add("question-container--slide-in");

    // if it is the last submit button:
    // get diagnosis and updates the state
    if (currentCardNumber === 14) {
      const esUrl = 'diagnosis/';
      const requestUrl = `${esUrl}${JSON.stringify(facts)}`;
      fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
          displayResult(data.disease, data.percentage)
        });
    }
  })
})

function displayResult(disease, percentage) {
  let diseaseHTML = '';
  let percentageHTML = '';
  // if they are array (there are multiple diseases diagnosed)
  if (Array.isArray(disease)) {
    const [d1, d2] = disease;
    const [p1, p2] = percentage;
    diseaseHTML = `${findDiseaseName(d1)} or ${findDiseaseName(d2)}`;
    percentageHTML = `Diagnosis confidence: ${p1}% and ${p2}%`;
  } else if (disease) {
    diseaseHTML = `${findDiseaseName(disease)}`;
    percentageHTML = `Diagnosis confidence: ${percentage}%`;
  } else {
    diseaseHTML = "";
    percentageHTML = "";
    document.getElementById('youhave').innerHTML = "you are healthy!";
  }
  document.getElementById('username').innerHTML = answers.name;
  document.getElementById('disease').innerHTML = diseaseHTML;
  document.getElementById('percentage').innerHTML = percentageHTML;
  setTimeout(() => 
    document.querySelector('.fixed-container').style.overflow = 'auto',
    800
  );

  // display / review user's answer
  for (const ans in answers) {
    document.getElementById(`review-${ans}`).innerHTML += `${answers[ans]}`;
  }
}

function findDiseaseName(code) {
  for (let i = 0; i < diseaseDescriptions.length; i++) {
    if (diseaseDescriptions[i].code === code) {
      return diseaseDescriptions[i].name;
    }
  }
}