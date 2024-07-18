document.addEventListener('DOMContentLoaded', (event) => {
    var pathname = window.location.pathname;
    var lastSegment = pathname.split('/').pop();
    content = ''
    const navItems = document.querySelectorAll('.nav-item');

    if(lastSegment == 'news'){
        content = 'TIN TỨC'
    }
    else if(lastSegment == 'blockchain'){
        content = 'NHẬT BÁO BLOCKCHAIN'
    }
    else if(lastSegment == 'crypto'){
        content = 'NHẬT BÁO CRYPTO'
    }
    else if(lastSegment == 'finance'){
        content = 'NHẬT BÁO TÀI CHÍNH'
    }
    const tieudeElements = document.querySelectorAll('.tieude');

    tieudeElements.forEach(element => {
        element.textContent = content;
    });

    navItems.forEach(item => {
        if (item.getAttribute('data-path') === lastSegment) {
          item.classList.add('active');
        }
      });
});
