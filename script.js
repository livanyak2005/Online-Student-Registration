// ===============================
// REGISTRATION
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const college = document.getElementById("college").value.trim();
        const course = document.getElementById("course").value;
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            college === "" ||
            course === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            message.textContent = "Please fill all fields.";
            message.style.color = "red";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            message.textContent = "Please enter a valid email.";
            message.style.color = "red";
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            message.textContent = "Phone number must contain 10 digits.";
            message.style.color = "red";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            message.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            message.style.color = "red";
            return;
        }

        const student = {
            name: name,
            email: email,
            phone: phone,
            college: college,
            course: course,
            username: username,
            password: password
        };

        localStorage.setItem("studentData", JSON.stringify(student));

        message.textContent = "Registration successful!";
        message.style.color = "green";

        setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        const storedData =
            localStorage.getItem("studentData");

        if (!storedData) {
            message.textContent = "No registered student found.";
            message.style.color = "red";
            return;
        }

        const student = JSON.parse(storedData);

        if (
            username === student.username &&
            password === student.password
        ) {

            message.textContent = "Login successful!";
            message.style.color = "green";

            setTimeout(function() {
                window.location.href = "profile.html";
            }, 800);

        } else {

            message.textContent = "Invalid username or password.";
            message.style.color = "red";
        }
    });
}


// ===============================
// PROFILE
// ===============================

if (window.location.pathname.includes("profile.html")) {

    const storedData =
        localStorage.getItem("studentData");

    if (!storedData) {

        window.location.href = "index.html";

    } else {

        const student = JSON.parse(storedData);

        document.getElementById("profileName").textContent =
            student.name;

        document.getElementById("profileEmail").textContent =
            student.email;

        document.getElementById("profilePhone").textContent =
            student.phone;

        document.getElementById("profileCollege").textContent =
            student.college;

        document.getElementById("profileCourse").textContent =
            student.course;

        document.getElementById("profileUsername").textContent =
            student.username;
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {
    window.location.href = "index.html";
}


// ===============================
// FORGOT PASSWORD
// ===============================

function resetPassword() {

    const username =
        document.getElementById("username").value.trim();

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("forgotMessage");


    if (!username || !newPassword || !confirmPassword) {

        message.textContent = "Please fill all fields.";
        message.style.color = "red";
        return;
    }


    const storedData =
        localStorage.getItem("studentData");


    if (!storedData) {

        message.textContent = "No registered student found.";
        message.style.color = "red";
        return;
    }


    const student =
        JSON.parse(storedData);


    if (student.username !== username) {

        message.textContent = "Username not found.";
        message.style.color = "red";
        return;
    }


    if (newPassword.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        message.style.color = "red";
        return;
    }


    if (newPassword !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.style.color = "red";
        return;
    }


    student.password = newPassword;

    localStorage.setItem(
        "studentData",
        JSON.stringify(student)
    );


    message.textContent =
        "Password reset successful!";

    message.style.color = "green";


    setTimeout(function() {

        window.location.href = "index.html";

    }, 1500);
}


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

function togglePassword(inputId, eyeIcon) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";
        eyeIcon.textContent = "🙈";

    } else {

        input.type = "password";
        eyeIcon.textContent = "👁️";
    }
}