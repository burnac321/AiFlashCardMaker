const signupForm = document.getElementById("signupForm");
const signupButton = document.getElementById("signupButton");
const messageBox = document.getElementById("signupMessage");


function passwordCheck(password, confirmPassword) {
    return password === confirmPassword;
}

function phoneCheck(phoneNumber) {

    return /^\d{10}$/.test(phoneNumber);
}

function userNameCheck(userName) {
    return userName.trim().length > 0 && userName.length <= 20;
}

function emailCheck(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


async function userSignup(event) {
    event.preventDefault();

    const userNames = signupForm.userNames.value.trim();
    const phoneNumber = signupForm.userPhoneNumber.value.trim();
    const email = signupForm.userEmail.value.trim();
    const password = signupForm.userPassword.value;
    const confirmPassword = signupForm.confirmPassword.value;

    if (!passwordCheck(password, confirmPassword)) {
        messageBox.innerText = "Passwords do not match.";
        messageBox.style.color = "red";
        return;
    }

    if (!userNameCheck(userNames)) {
        messageBox.innerText =
            "Username must not be empty and must be at most 20 characters.";
        messageBox.style.color = "red";
        return;
    }

    if (!phoneCheck(phoneNumber)) {
        messageBox.innerText =
            "Phone number must contain exactly 10 digits.";
        messageBox.style.color = "red";
        return;
    }
    if (!emailCheck(email)) {
        messageBox.innerText = "Please enter a valid email address.";
        messageBox.style.color = "red";
        return;
    }

    try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userNames,
                phoneNumber,
                email,
                password
            })
        });

        if (response.ok) {
            messageBox.innerText = "Your account was created successfully.";
            messageBox.style.color = "green";

            signupForm.reset();
        } else {
            const error = await response.text();
            messageBox.innerText =
                error || "Account creation failed. Please try again.";
            messageBox.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        messageBox.innerText =
            "Unable to connect to the server. Please try again later.";
        messageBox.style.color = "red";
    }
}

signupForm.addEventListener("submit", userSignup);