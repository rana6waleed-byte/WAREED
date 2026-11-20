var form = document.getElementById("requestForm");

// show or clear an error under a field
function setError(id, message) {
    var errorSpan = document.getElementById(id + "Error");
    errorSpan.textContent = message;

    var group = errorSpan.parentElement;
    if (message) {
        group.classList.add("has-error");
    } else {
        group.classList.remove("has-error");
    }
    return message === "";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var hospital = document.getElementById("hospital").value.trim();
    var location = document.getElementById("location").value.trim();
    var patient = document.getElementById("patient").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var bloodGroup = document.getElementById("bloodGroup").value;
    var units = Number(document.getElementById("units").value);
    var urgency = document.getElementById("urgency").value;
    var genderInput = document.querySelector('input[name="gender"]:checked');

    var valid = true;

    if (!setError("hospital", hospital ? "" : "Hospital name is required")) valid = false;
    if (!setError("location", location ? "" : "Location is required")) valid = false;
    if (!setError("patient", patient ? "" : "Patient name is required")) valid = false;

    var phonePattern = /^01[0125][0-9]{8}$/;
    if (!setError("phone", phonePattern.test(phone) ? "" : "Enter a valid phone number")) valid = false;

    if (!setError("gender", genderInput ? "" : "Please select gender")) valid = false;
    if (!setError("bloodGroup", bloodGroup ? "" : "Please select a blood group")) valid = false;
    if (!setError("units", (units >= 1 && units <= 20) ? "" : "Units must be between 1 and 20")) valid = false;
    if (!setError("urgency", urgency ? "" : "Please select urgency level")) valid = false;

    if (!valid) {
        return;
    }

    var request = {
        id: Date.now(),
        hospital: hospital,
        location: location,
        patient: patient,
        phone: phone,
        gender: genderInput.value,
        bloodGroup: bloodGroup,
        units: units,
        urgency: urgency,
        date: new Date().toLocaleDateString()
    };

    // save the request so the Dashboard page can read it
    var requests = JSON.parse(localStorage.getItem("bloodRequests") || "[]");
    requests.push(request);
    localStorage.setItem("bloodRequests", JSON.stringify(requests));

    form.style.display = "none";
    document.getElementById("successText").textContent =
        units + " unit(s) of " + bloodGroup + " needed at " + hospital + ", " + location + " (" + urgency + ").";
    document.getElementById("successBox").style.display = "block";
});