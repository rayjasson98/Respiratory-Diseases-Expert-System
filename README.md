# Respiratory Diseases Expert System

*[Ray Jasson](mailto:holmesqueen2070@yahoo.com)*<br>
*30/01/2021*<br>

<br>

## :notebook: Background

This is a simple expert system for diagnosis of respiratory diseases written in JavaScript. The expert system is developed using [rools](https://github.com/frankthelen/rools), a small rule engine for Node.js, and [Handlebars.js](https://github.com/handlebars-lang/handlebars.js), a semantic templating language for JavaScript. [Try it here!](https://respiratory-diseases-es.herokuapp.com/)

<p align=center><img src="/docs/img/ui.png"></p>
<p align="center"><i>UI of the expert system</i></p>

<br>

A total of 16 respiratory diseases have been selected for differential diagnosis:
- Acute bronchitis
- Asthma
- Bronchiectasis
- Bronchiolitis
- Chronic Obstructive Pulmonary Disease (COPD)
- Common cold
- COVID-19
- Croup
- Cystic fibrosis
- Influenza
- Lung cancer
- Occupational lung diseases
- Pertussis
- Pneumonia
- Rhinosinusitis
- Tuberculosis

The differential diagnosis is based on a set of 13 factors that are categorized into:
- **Epidemiological factors**
  - Age group
  - Gender
  - Family history
  - Smoking history
- **Clinical factors**
  - Duration
  - Chest pain
  - Cough
  - Coughing up blood (Hemoptysis)
  - Fever
  - Rapid breathing (Tachypnea)
  - Rapid heartbeat (Tachycardia)
  - Shortness of breath (dyspnea)
  - Wheezing

<br>

## :evergreen_tree: Building Decision Tree using ID3 Algorithm

The [Iterative Dichotomiser 3 (ID3) algorithm](https://en.wikipedia.org/wiki/ID3_algorithm#:~:text=In%20decision%20tree%20learning%2C%20ID3,and%20natural%20language%20processing%20domains.) is used to generate a decision tree for the expert system. The decision tree can be converted into a comparable rule set in which each rule corresponds to a possible path from the root node to any leaf node. The rule set is used as the rule engine for the expert system.

<p align=center><img src="/docs/img/decision_tree.png"></p>
<p align="center"><i>The decision tree</i></p>

<br>

:unlock: **Note that only 9 out of 13 factors are used to extract the decision rules.**

This is due to 2 rationales:
- The 9 included factors: smoking history, chest pain, cough, coughing up blood, fever, rapid breathing, rapid heartbeat, shortness of breath and wheezing are the primary predictors or indicators of respiratory diseases. These predictors are symptoms that are caused directly by a particular respiratory disease. Smoking history is an exception here. It is not a symptom, but it is the *leading cause* of most respiratory diseases.
- The 4 excluded factors: age group, gender, family history and duration are considered as risk factors of respiratory diseases. Risk factors are *correlational* and *not necessarily causal*, and correlation does not imply causation. These risk factors may increase the risk of developing respiratory diseases, but they are not the *direct* or *leading causes* for the diseases.

<br>

## :speech_balloon: Implementation in JavaScript

The decision rules are transformed into JavaScript code using [rools](https://github.com/frankthelen/rools). For example:

```javascript
const { Rools, Rule } = require('rools');
const rules = [];

rules[0] = new Rule({
    name: "pertussis and influenza diagnosis",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "dry",
        facts => facts.coughingUpBlood === "N",
        facts => facts.chestPain === "N",
        facts => facts.rapidBreathing === "N",
        facts => facts.rapidHeartbeat === "N",
    ],
    then: facts => {
        facts.disease = ["pertussis", "influenza"];
        facts.percentage = [evaluate("pertussis", facts, data), 
                            evaluate("influenza", facts, data)];
    },
});

rules[1] = new Rule({
    name: "influenza diagnosis 2",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "dry",
        facts => facts.coughingUpBlood === "N",
        facts => facts.chestPain === "N",
        facts => facts.rapidBreathing === "N",
        facts => facts.rapidHeartbeat === "Y",
    ],
    then: facts => {
        facts.disease = "influenza";
        facts.percentage = evaluate("influenza", facts, data);
    },
});
```

<br>

## :computer: Program Execution

### **Run locally for development**

Download the code, and from the root directory, run:

```
npm install
npm devstart
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### **Deploy the app on cloud**

This app is also deployed on [Heroku](https://www.heroku.com/).

<br>

## :black_nib: References

- [WikiDoc for Respiratory Disease Differential Diagnosis](https://www.wikidoc.org/index.php/Respiratory_disease_differential_diagnosis)
- [WikiDoc for COVID-19 Differential Diagnosis](https://www.wikidoc.org/index.php/COVID-19_differential_diagnosis)
- [An expert system for diagnosis of diabetes](https://github.com/ZenHuzaini/node-js-expert-system-diabetes)
- [rools - a small rule engine for Node.js](https://github.com/frankthelen/rools)
- [Python scripts for generating decision trees](https://github.com/Erikfather/Decision_tree-python)
- [Handlebars.js - a simple semantic templating langauge](https://github.com/handlebars-lang/handlebars.js)