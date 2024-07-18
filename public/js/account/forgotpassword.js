const successMessage = document.getElementById('successMessage')
const errorMessage = document.getElementById('errorMessage')

document.getElementById('forgotpasswordForm').addEventListener('submit', function(event) {
    console.log("da vao ham nay")
    event.preventDefault();
    
    const form = event.target;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(result => {
        if(result.code == 0){
            successMessage.innerHTML = "Mật khẩu mới đã được gửi đển email. Chuyển hướng đến trang đăng nhập sau";
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