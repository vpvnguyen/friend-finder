// bootstrap front-end form validation
// checks if fields are filled in
(function () {
    'use strict';
    window.addEventListener('load', function () {

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = $('.needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {

                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');

                // if name and image fields are valid, get form details
                if (form.checkValidity()) {
                    getForm();
                }
            }, false);
        });
    }, false);
})();

// get form details and pass to validation
function getForm() {

    // get data from form
    var userName = $('#name').val().trim();
    var userImage = $('#image').val().trim();
    var q1 = Number($('#q1').val());
    var q2 = Number($('#q2').val());
    var q3 = Number($('#q3').val());
    var q4 = Number($('#q4').val());
    var q5 = Number($('#q5').val());
    var q6 = Number($('#q6').val());
    var q7 = Number($('#q7').val());
    var q8 = Number($('#q8').val());
    var q9 = Number($('#q9').val());
    var q10 = Number($('#q10').val());

    // construct object from form data
    var userProfile = {
        name: userName,
        image: userImage,
        answer1: q1,
        answer2: q2,
        answer3: q3,
        answer4: q4,
        answer5: q5,
        answer6: q6,
        answer7: q7,
        answer8: q8,
        answer9: q9,
        answer10: q10
    };

    // construct object from form data to be sent as API / JSON
    var userProfileJson = {
        name: userName,
        image: userImage,
        answers: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]
    }
    // validate form data
    validateForm(userProfile, userProfileJson);
};

function validateForm(userProfile, userProfileJson) {

    // checks if answer to question is filled in correctly
    if (userProfile.name.length == 0 || userProfile.image.length == 0 || userProfile.answer1 == 0 || userProfile.answer2 == 0 || userProfile.answer3 == 0 || userProfile.answer4 == 0 || userProfile.answer5 == 0 || userProfile.answer6 == 0 || userProfile.answer7 == 0 || userProfile.answer8 == 0 || userProfile.answer9 == 0 || userProfile.answer10 == 0) {
        alert('Please fill out all fields.');
    } else {
        submitForm(userProfile);
        postAPI(userProfileJson);
    };
};

function submitForm(userProfile) {
    // Send the POST request.
    $.ajax(`/db/friends`, {
        type: 'POST',
        data: userProfile
    }).catch(function (err) {
        if (err) throw err;
        console.log('uh oh');
    });
};

// GET DATA TO API / JSON
function postAPI(userProfileJson) {
    // Send the POST request.
    $.ajax(`/api/friends`, {
        type: 'POST',
        data: userProfileJson
    }).catch(function (err) {
        if (err) throw err;
        console.log('uh oh');
    });
};
