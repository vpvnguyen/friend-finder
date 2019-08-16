// bootstrap form validation
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
            }, false);
        });
    }, false);
})();

// // get value from form
// $("#submit").click(function(event) {
//     event.preventDefault();

//     var val = $('.form-control').serializeArray();
//     console.log(val)
//   });

$("form").submit(function (event) {
    event.preventDefault();
    // console.log($('.form-control').val());
    var name = $('#name').val();
    var image = $('#image').val();
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

    console.log(name, image, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)

});

// constructor function called "Programmer" which can be used to create objects containing information on various programmers.

function formDetails(name, title, age, fav) {
    this.name = name;
    this.title = title;
    this.age = age;
    this.fav = fav;
    // this.print = function () {
    //     console.log(this.name, this.title, this.age, this.fav);
    // }
}

// // prototype way
// Programmer.prototype.printInfo = function () {
//     console.log(this.name, this.title, this.age, this.fav);
// }

// // create instance of programmer
// var bob = new Programmer('Vincent', 'Engineer', 30, 'JS');
// bob.printInfo();


