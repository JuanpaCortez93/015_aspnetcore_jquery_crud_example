// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// CREATE QUERY SELECTORS
const form = document.querySelector('#userForm');
const inputs = document.querySelectorAll('#userForm input');

// REGULAR EXPRESSIONS
const regex = {
    name: /^([A-ZÁÉÍÓÚÑ]{1,1}[a-záéíóúñ']{1,}\s?){1,2}$/,
    password: /^(?=.*[.!?@#$%^&*])[A-Za-z\d.!?@#$%^&*]{8,16}$/,
    email: /^[a-z_\.]{5,30}\+?[\w]{0,30}@\w+\.\w{2,3}(\.\w{2,3})?$/
};

// VALIDATION STATE OF THE DIFFERENT INPUTS
const campos = {
    user__firstname: false,
    user__lastname: false,
    user__password: false,
    user__email: false,
}

// ADD-REMOVE STYLES TO THE VALIDATION
const form_validator = (e) => {

    try {
        switch (e.target.name) {
            case 'FirstName':
                validation_styles(regex.name, e.target, 'user__firstname');
                break;

            case 'LastName':
                validation_styles(regex.name, e.target, 'user__lastname');
                break;

            case 'Password':
                validation_styles(regex.password, e.target, 'user__password');
                break;

            case 'ConfirmPassword':
                password_validator();
                break;

            case 'Email':
                validation_styles(regex.email, e.target, 'user__email');
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

// ADD-REMOVE STYLES TO THE VALIDATION - FUNCTION
const validation_styles = (expression, input, id_name) => {

    try {
        if (expression.test(input.value)) {
            document.querySelector("#" + id_name).classList.add('form__group-correct');
            document.querySelector("#" + id_name).classList.remove('form__group-incorrect');

            document.querySelector("#" + id_name + ' i').classList.remove('fa-times-circle-o');
            document.querySelector("#" + id_name + ' i').classList.add('fa-check-circle');

            document.querySelector("#" + id_name + " .form__input-error").classList.remove('form__input-error-active');

            campos[id_name] = true
        } else {
            document.querySelector("#" + id_name).classList.add('form__group-incorrect');
            document.querySelector("#" + id_name).classList.remove('form__group-correct');

            document.querySelector('#' + id_name + ' i').classList.remove('inactive');

            document.querySelector('#' + id_name + ' i').classList.add('fa-times-circle-o');
            document.querySelector('#' + id_name + ' i').classList.remove('fa-check-circle');

            document.querySelector('#' + id_name + ' .form__input-error').classList.add('form__input-error-active');

            campos[id_name] = false
        }
    } catch (e) {
        console.log(e);
    }
}

// PASSWORD VALIDATOR
const password_validator = () => {

    try {
        const inputPassword1 = document.querySelector('#Password');
        const inputPassword2 = document.querySelector('#ConfirmPassword');

        id_name = 'user__password2';

        if (inputPassword1.value === inputPassword2.value) {
            document.querySelector("#user__password2").classList.add('form__group-correct');
            document.querySelector("#user__password2").classList.remove('form__group-incorrect');

            document.querySelector("#user__password2 i").classList.remove('fa-times-circle-o');
            document.querySelector("#user__password2 i").classList.add('fa-check-circle');

            document.querySelector("#user__password2 .form__input-error").classList.remove('form__input-error-active');

            campos['user__password'] = true
        } else {
            document.querySelector("#user__password2").classList.add('form__group-incorrect');
            document.querySelector("#user__password2").classList.remove('form__group-correct');

            document.querySelector('#user__password2 i').classList.remove('inactive');

            document.querySelector('#user__password2 i').classList.add('fa-times-circle-o');
            document.querySelector('#user__password2 i').classList.remove('fa-check-circle');

            document.querySelector('#user__password2 .form__input-error').classList.add('form__input-error-active');

            campos['user__password'] = false
        }
    } catch (e) {
        console.log(e);
    }
}

// KEY UP AND BLUR ADD-EVENT LISTENERS TO REAL-TIME INFO VALIDATION
inputs.forEach((input) => {
    input.addEventListener('keyup', form_validator);
    input.addEventListener('blur', form_validator);
});

// VALIDATE FORM AND SEND DATA
// I DECIDED TO ENCRYPT PASSWORDS USING A WELL KNOW-FUNCTION IN GITHUB. HOWEVER, I PUT THE FIELD CONFIRM PASSWORD IN THE DATABASE TO SHOW THAT
// REAL TEXT IS PROCESSED AND SENT.
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.user__firstname && campos.user__lastname && campos.user__password && campos.user__email) {

        document.querySelector('.form__message-success').classList.add('form__message-success-active');

        setTimeout(() => {
            document.querySelector('.form__message-success').classList.remove('form__message-success-active');
        }, 2000);

        document.querySelectorAll('.form__group-correct').forEach((icon) => {
            icon.classList.remove('form__group-correct');
        });

        saveData();
               
    } else {

        document.querySelector('#form__message').classList.add('form__message-active');

        setTimeout(() => {
            document.querySelector('#form__message').classList.remove('form__message-active');
        }, 5000);

    }

});

//ENCRYPT PASSWORD WITH SHA256 (BIG SHOUTOUT TO geraintluff.github.io/sha256/)
const sha256 = (ascii) => {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    };

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;

    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return; // ASCII check: only accept characters in range 0-255
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength)

    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        var oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                    w[i - 16]
                    + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                    + w[i - 7]
                    + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                ) | 0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

            hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};

//SAVE DATA IN THE DATABASE FUNCTION WITH AJAX POST
const saveData = () => {

    var user = {
        FirstName: $("#FirstName").val(),
        LastName: $("#LastName").val(),
        Email: $("#Email").val(),
        Password: sha256($("#Password").val()),
        ConfirmPassword: $("#ConfirmPassword").val()
    };

    $.ajax({
        type: "POST",
        url: "/User/AddUser",
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.success) {
                window.location.href = "/Success";
            } else {
                // Manejar errores de validación si es necesario
                console.log(response.errors);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
};

