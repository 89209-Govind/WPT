
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    document.querySelectorAll('.text-danger').forEach(error => error.innerHTML = '');

    let isValid = true;

    let name = document.getElementById('name').value.trim();
    let birthdate = document.getElementById('birthdate').value;
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let address = document.getElementById('address').value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let course = document.getElementById('course').value;
    let skills = document.querySelectorAll('input[name="skills"]:checked');
    let photo = document.getElementById('photo').files[0];

    if (!/^[A-Za-z]{1,10}$/.test(name)) {
        document.getElementById('nameError').innerHTML = 'Name must have only alphabets and max 10 characters.';
        isValid = false;
    }

    if (birthdate === '') {
        document.getElementById('birthdateError').innerHTML = 'Birthdate is required.';
        isValid = false;
    } else {
        let birth = new Date(birthdate);
        let today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        let monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        if (birth > today) {
            document.getElementById('birthdateError').innerHTML = 'Birthdate must be a past date.';
            isValid = false;
        } else if (age < 18) {
            document.getElementById('birthdateError').innerHTML = 'You must be at least 18 years old.';
            isValid = false;
        }
    }

    if (email === '') {
        document.getElementById('emailError').innerHTML = 'Email is required.';
        isValid = false;
    }

    if (password.length <= 8 || !password.includes('#') || !/\d/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must be greater than 8 characters, contain "#" and at least one digit.';
        isValid = false;
    }

    if (address === '') {
        document.getElementById('addressError').innerHTML = 'Address is required.';
        isValid = false;
    }

    if (!gender) {
        document.getElementById('genderError').innerHTML = 'Please select your gender.';
        isValid = false;
    }

    if (course === '') {
        document.getElementById('courseError').innerHTML = 'Please select your course.';
        isValid = false;
    }

    if (skills.length === 0) {
        document.getElementById('skillsError').innerHTML = 'Please select at least one skill.';
        isValid = false;
    }

    
    if (!photo) {
        document.getElementById('photoError').innerHTML = 'Please upload a photo.';
        isValid = false;
    } else {
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(photo.type)) {
            document.getElementById('photoError').innerHTML = 'Only JPG, JPEG, and PNG files are allowed.';
            isValid = false;
        }

    
        if (photo.size > 5 * 1024 * 1024) { 
            document.getElementById('photoError').innerHTML = 'File size must be less than 5MB.';
            isValid = false;
        }
    }

    if (isValid) {
        let formData = {
            name: name,
            birthdate: birthdate,
            email: email,
            password: password,
            address: address,
            gender: gender.value,
            course: course,
            skills: Array.from(skills).map(skill => skill.value),
            photo: photo.name 
        };
        sessionStorage.setItem('registrationData', JSON.stringify(formData));
        alert('Registration Successful!');
        this.reset();
    }
});

