const data = require('./data.json');
const { Rools, Rule } = require('rools');

function evaluate(diseaseName, facts, data) {
    const i = data.findIndex(d => d.disease === diseaseName);
    const disease = Object.values(data[i]);
    facts = Object.values(facts);
    let matchNo = 0;
    
    for(let i = 1; i < disease.length; ++i) {
        if (Array.isArray(disease[i]) && disease[i].some(symptom => symptom === facts[i])) {
            ++matchNo;
        }
        else if (facts[i] === disease[i]) {
            ++matchNo;
        }
    }
    let percentage = matchNo/(disease.length - 1)*100;
    return percentage.toFixed(2);
}

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
        facts.percentage = [evaluate("pertussis", facts, data), evaluate("influenza", facts, data)];
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

rules[2] = new Rule({
    name: "influenza diagnosis 3",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "dry",
        facts => facts.coughingUpBlood === "N",
        facts => facts.chestPain === "N",
        facts => facts.rapidBreathing === "Y",
    ],
    then: facts => {
        facts.disease = "influenza";
        facts.percentage = evaluate("influenza", facts, data);
    },
});

rules[3] = new Rule({
    name: "influenza diagnosis 4",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "dry",
        facts => facts.coughingUpBlood === "N",
        facts => facts.chestPain === "Y",
    ],
    then: facts => {
        facts.disease = "influenza";
        facts.percentage = evaluate("influenza", facts, data);
    },
});

rules[4] = new Rule({
    name: "covid-19 diagnosis",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "dry",
        facts => facts.coughingUpBlood === "Y",
    ],
    then: facts => {
        facts.disease = "covid-19";
        facts.percentage = evaluate("covid-19", facts, data);
    },
});

rules[5] = new Rule({
    name: "croup diagnosis",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "productive",
        facts => facts.smokingHistory === "N",
        facts => facts.chestPain === "N",
    ],
    then: facts => {
        facts.disease = "croup";
        facts.percentage = evaluate("croup", facts, data);
    },
});

rules[6] = new Rule({
    name: "tuberculosis diagnosis",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "productive",
        facts => facts.smokingHistory === "N",
        facts => facts.chestPain === "Y",
    ],
    then: facts => {
        facts.disease = "tuberculosis";
        facts.percentage = evaluate("tuberculosis", facts, data);
    },
});

rules[7] = new Rule({
    name: "rhinosinusitis diagnosis",
    when: [
        facts => facts.wheezing === "N",
        facts => facts.cough === "productive",
        facts => facts.smokingHistory === "Y",
    ],
    then: facts => {
        facts.disease = "rhinosinusitis";
        facts.percentage = evaluate("rhinosinusitis", facts, data);
    },
});

rules[8] = new Rule({
    name: "common cold diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "N",
        facts => facts.rapidBreathing === "N",
        facts => facts.chestPain === "N",
    ],
    then: facts => {
        facts.disease = "commonCold";
        facts.percentage = evaluate("commonCold", facts, data);
    },
});

rules[9] = new Rule({
    name: "acute bronchitis diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "N",
        facts => facts.rapidBreathing === "N",
        facts => facts.chestPain === "Y",
        facts => facts.coughingUpBlood === "N",
    ],
    then: facts => {
        facts.disease = "acuteBronchitis";
        facts.percentage = evaluate("acuteBronchitis", facts, data);
    },
});

rules[10] = new Rule({
    name: "bronchiectasis diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "N",
        facts => facts.rapidBreathing === "N",
        facts => facts.chestPain === "Y",
        facts => facts.coughingUpBlood === "Y",
    ],
    then: facts => {
        facts.disease = "bronchiectasis";
        facts.percentage = evaluate("bronchiectasis", facts, data);
    },
});

rules[11] = new Rule({
    name: "asthma diagnosis 1",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "N",
        facts => facts.rapidBreathing === "Y",
        facts => facts.cough === "dry",
    ],
    then: facts => {
        facts.disease = "asthma";
        facts.percentage = evaluate("asthma", facts, data);
    },
});

rules[12] = new Rule({
    name: "asthma and cystic fibrosis diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "N",
        facts => facts.rapidBreathing === "Y",
        facts => facts.cough === "productive",
        facts => facts.fever === "N",
    ],
    then: facts => {
        facts.disease = ["asthma", "cysticFibrosis"];
        facts.percentage = [evaluate("asthma", facts, data), evaluate("cysticFibrosis", facts, data)];
    },
});

rules[13] = new Rule({
    name: "cysticFibrosis diagnosis 2",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "N",
        facts => facts.rapidBreathing === "Y",
        facts => facts.cough === "productive",
        facts => facts.fever === "Y",
    ],
    then: facts => {
        facts.disease = "cysticFibrosis";
        facts.percentage = evaluate("cysticFibrosis", facts, data);
    },
});

rules[14] = new Rule({
    name: "bronchiolitis diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "Y",
        facts => facts.chestPain === "N",
        facts => facts.cough === "dry",
    ],
    then: facts => {
        facts.disease = "bronchiolitis";
        facts.percentage = evaluate("bronchiolitis", facts, data);
    },
});

rules[15] = new Rule({
    name: "copd diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "Y",
        facts => facts.chestPain === "N",
        facts => facts.cough === "productive",
    ],
    then: facts => {
        facts.disease = "copd";
        facts.percentage = evaluate("copd", facts, data);
    },
});

rules[16] = new Rule({
    name: "occupational lung diseases diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "Y",
        facts => facts.chestPain === "Y",
        facts => facts.coughingUpBlood === "N",
        facts => facts.cough === "dry",
    ],
    then: facts => {
        facts.disease = "occupationalLungDiseases";
        facts.percentage = evaluate("occupationalLungDiseases", facts, data);
    },
});

rules[17] = new Rule({
    name: "pneumonia diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "Y",
        facts => facts.chestPain === "Y",
        facts => facts.coughingUpBlood === "N",
        facts => facts.cough === "productive",
    ],
    then: facts => {
        facts.disease = "pneumonia";
        facts.percentage = evaluate("pneumonia", facts, data);
    },
});

rules[18] = new Rule({
    name: "lung cancer diagnosis",
    when: [
        facts => facts.wheezing === "Y",
        facts => facts.smokingHistory === "Y",
        facts => facts.chestPain === "Y",
        facts => facts.coughingUpBlood === "Y",
    ],
    then: facts => {
        facts.disease = "lungCancer";
        facts.percentage = evaluate("lungCancer", facts, data);
    },
});

async function diagnose(facts) {
    const rools = new Rools();
    await rools.register(rules);
    await rools.evaluate(facts);
    return facts;
};

module.exports = { diagnose };