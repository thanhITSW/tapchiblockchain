document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 6;
    const blogContainer = document.getElementById('blog-container');
    const paginationContainer = document.getElementById('pagination-container');
    const blogItems = Array.from(blogContainer.getElementsByClassName('col-lg-4'));
    const totalPages = Math.ceil(blogItems.length / itemsPerPage);

    function showPage(page) {
        blogItems.forEach((item, index) => {
            item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'block' : 'none';
        });
    }

    function createPagination() {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.innerText = i;
            pageLink.className = 'page-link';
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                showPage(i);
                updateActivePage(i);
            });
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            pageItem.appendChild(pageLink);
            paginationContainer.appendChild(pageItem);
        }
    }

    function updateActivePage(activePage) {
        const pageLinks = paginationContainer.getElementsByClassName('page-link');
        Array.from(pageLinks).forEach((link, index) => {
            link.parentElement.classList.toggle('active', index === activePage - 1);
        });
    }

    // Initial setup
    showPage(1);
    createPagination();
    updateActivePage(1);
});