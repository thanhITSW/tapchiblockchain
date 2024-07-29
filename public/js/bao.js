const successMessage = document.getElementById('successMessage')
const errorMessage = document.getElementById('errorMessage')
window.addEventListener("load", function(){
    var pathname = window.location.pathname;
    var lastSegment = pathname.split('/').pop();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`/updateView/${lastSegment}`, options)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
})

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(result => {
        if(result.code == 0){
            successMessage.innerHTML = "Thêm bình luận thành công"
            successMessage.style.display = 'block'
            setTimeout(() => {
                successMessage.style.display = 'none'
                location.reload();
            }, 3000);
            form.reset();
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
});

function shareToFacebook(){
    
    var pathname = window.location.pathname;
    var lastSegment = pathname.split('/').pop();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`/updateShare/${lastSegment}`, options)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        var currentPageUrl = window.location.href;
        var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentPageUrl);
        window.open(facebookShareUrl, '_blank');
        return response.json();
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
}