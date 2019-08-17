// bootstrap form validation 
// disabling form submissions if there are invalid fields 
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// construct object from form details
function FormDetails(name, image, questions) {
    var formDetails = {
        name: name,
        image: image,
        questions: questions
    }

    // if details are missing, value is null
    console.log(formDetails)

    $.post("/api/characters", formDetails)
        .then(function (data) {
            // if details are missing, value is now empty str
            console.log(data);
            alert("Submitting form...");
        });
};

// form submit button
$("form").submit(function (event) {
    event.preventDefault();
    var name = $('#name').val().trim();
    var image = $('#image').val().trim();
    var q1 = $('#q1').val();
    var q2 = $('#q2').val();
    var q3 = $('#q3').val();
    var q4 = $('#q4').val();
    var q5 = $('#q5').val();
    var q6 = $('#q6').val();
    var q7 = $('#q7').val();
    var q8 = $('#q8').val();
    var q9 = $('#q9').val();
    var q10 = $('#q10').val();
    var questions = [];
    questions.push(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);

    // construct object from form details
    FormDetails(name, image, questions);
});



