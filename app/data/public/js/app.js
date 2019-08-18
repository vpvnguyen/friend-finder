// Example starter JavaScript for disabling form submissions if there are invalid fields
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
                if (form.checkValidity() === true) {
                    submitForm()
                }
            }, false);
        });
    }, false);
})();

function submitForm() {
    // form submit button

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

    // construct object from form details
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
    }

    console.log(userProfile)

    // Send the POST request.
    $.ajax(`/api/form`, {
        type: "POST",
        data: userProfile
    }).then(
        function () {
            console.log("created new user profile");
            // Reload the page to get the updated list
            // location.reload();
        }
    ).catch(function (err) {
        if (err) throw err;
        console.log('uh oh');
    });


}
