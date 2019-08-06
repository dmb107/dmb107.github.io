
Survey
    .StylesManager
    .applyTheme("default");

var json = {
    showQuestionNumbers: "off",
    questions: [
        {
            type: "radiogroup",
            name: "clinicallyDiagnosed",
            title: "Have you been diagnosed with CMT or a related neuropathy?",
            isRequired: true,
            choices: [
                "Yes", "No"
            ],
            colCount: 0
        }, {
            type: "dropdown",
            name: "diagnosis",
            title: "Have you been clinically diagnosed with one of the following conditions?",
            visibleIf: "{clinicallyDiagnosed}='Yes'",
            isRequired: true,
            choices: ['Charcot-Marie-Tooth disease','Hereditary motor and sensory neuropathy', 'Hereditary motor neuropathy', 'Hereditary motor and autonomic neuropathy', 'Spinal muscular atrophy', 'None of these'] // if none of these: email form for more info
        }, {
            type: "radiogroup",
            choices: [
                "Yes", "No"
            ],
            name: "geneticTesting",
            title: "Have you had genetic testing?",
            visibleIf: "{clinicallyDiagnosed}='Yes' and {diagnosis} != 'None of these' and {diagnosis} notempty",
            isRequired: true,
            colCount: 0
        }, {
           type: "radiogroup",
           choices: [
               "Yes", "No"
           ],
           name: "geneticTestingResult",
           title: "Did you receive a positive genetic diagnosis?",
           visibleIf: "{clinicallyDiagnosed}='Yes' and {diagnosis} != 'None of these' and {diagnosis} notempty and {geneticTesting}='Yes'",
           isRequired: true,
           colCount: 0 // if yes: email form for more info
       }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

$("#surveyElement").Survey({model: survey});
