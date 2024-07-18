const successMessage = document.getElementById('successMessage')
const errorMessage = document.getElementById('errorMessage')
const errorPassword = document.getElementById('errorPassword')
const passwordModal = new bootstrap.Modal(document.getElementById('changePasswordModal'));

function hideChangePasswordModal() {
    passwordModal.hide();
}

function openChangePasswordModal() {
    passwordModal.show();
}

document.getElementById('changePasswordButton').addEventListener('click', openChangePasswordModal);

document.getElementById('closeModalPassword').addEventListener('click', hideChangePasswordModal)

function updateInformation(){
    inputPhone = document.getElementById('phone').value
    inputFullName = document.getElementById('name').value
    avatarInput = document.getElementById('fileInput')

    if(!inputFullName || !inputPhone){
        errorMessage.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        errorMessage.style.display = 'block'
        setTimeout(() => {
            errorMessage.style.display = 'none'
        }, 2000)
        return
    }

    var formData = new FormData();
    formData.append('name', inputFullName);
    formData.append('phone', inputPhone);

    if(avatarInput.files.length > 0){
        formData.append('image', avatarInput.files[0]);
    }

    fetch('/account/changeInformation', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(responseData => {
        const message = responseData.message;
        if (responseData.code == 0) {
            successMessage.innerHTML = 'Thay đổi thông tin thành công';
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
        else{
            errorMessage.innerHTML = message;
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function updateProfileImage(event) {
    var input = event.target;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);

        updateInformation()
    }
}

function saveNewPassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        errorPassword.innerHTML = "Mật khẩu mới và xác nhận lại mật khẩu không khớp";
        errorPassword.style.display = 'block';
        setTimeout(() => {
            errorPassword.style.display = 'none';
        }, 3000);
        return;
    }

    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword
    }

    fetch('/account/changePassword', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        const message = responseData.message;
        if (responseData.code == 0) {
            successMessage.innerHTML = 'Thay đổi mật khẩu thành công';
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            hideChangePasswordModal()
        } else {
            errorPassword.innerHTML = message;
            errorPassword.style.display = 'block';
            setTimeout(() => {
                errorPassword.style.display = 'none';
            }, 3000);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}