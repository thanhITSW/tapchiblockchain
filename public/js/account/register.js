const successMessage = document.getElementById('successMessage')
const errorMessage = document.getElementById('errorMessage')

function show_hide_password(inputId, target) {
    var input = $(inputId);
    if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        $(target).addClass('view');
    } else {
        input.attr('type', 'password');
        $(target).removeClass('view');
    }
    return false;
}

function show_hide_repassword(inputId, target) {
    var input = $(inputId);
    if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        $(target).addClass('view');
    } else {
        input.attr('type', 'password');
        $(target).removeClass('view');
    }
    return false;
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(result => {
        if(result.code == 0){
            successMessage.innerHTML = "Đăng ký thành công. Chuyển hướng đến trang đăng nhập sau";
            successMessage.style.display = 'block';
            form.reset();

            let countdown = 5;
            let countdownElement = document.createElement('span');
            countdownElement.style.marginLeft = '10px';
            successMessage.appendChild(countdownElement);

            let interval = setInterval(() => {
                countdownElement.innerHTML = `${countdown--}s`;
                if (countdown < 0) {
                    clearInterval(interval);
                    successMessage.style.display = 'none';
                    window.location.href = '/login';
                }
            }, 1000);
        }
        else{
            errorMessage.innerHTML = result.message
            errorMessage.style.display = 'block'
            setTimeout(() => {
                errorMessage.style.display = 'none'
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
})