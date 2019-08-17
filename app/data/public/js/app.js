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

var mysql = require('../../../../node_modules/mysql');

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "friendFinder"
});

// construct object from form details
function insertFormDetails(name, image, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) {


};

// form submit button
$("form").submit(function (event) {
    event.preventDefault();
    var name = $('#name').val().trim();
    var image = $('#image').val().trim();
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
    insertFormDetails(name, image, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);
});



