
function validateForm() {

    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var age = document.getElementById("age").value;
    var bloodGroup = document.getElementById("bloodGroup").value;
    var governorate = document.getElementById("governorate").value;
    var address = document.getElementById("address").value;

    if (fullName == "" || email == "" || phone == "" ||
        age == "" || bloodGroup == "" || governorate == "" ||
        address == "") {

        alert("Please fill in all fields.");
        return false;
    }

    if (age < 18 || age > 65) {
        alert("Age must be between 18 and 65.");
        return false;
    }

    if (phone.length != 11) {
        alert("Phone number must contain 11 digits.");
        return false;
    }

    alert("Your registration information is valid.");

    return false;
}
