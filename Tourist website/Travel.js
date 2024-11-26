

const text = document.querySelector('.text p');
text.innerHTML = text.innerText.split('').map(
  (char, i) => `<span style="transform:rotate(${i * 8.3}deg)">${char}</span>`
).join('');



document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryRow = document.querySelector('.gallery-row');

    const destinations = ['London', 'America', 'China', 'Japan', 'Lahore'];

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredDestinations = destinations.filter(dest => 
            dest.toLowerCase().includes(searchTerm)
        );

        displayResults(filteredDestinations);
        highlightGalleryItems(searchTerm);
    }

    function displayResults(results) {
        if (results.length > 0) {
            const resultHtml = results.map(dest => `<p>${dest}</p>`).join('');
            searchResults.innerHTML = resultHtml;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
            searchResults.style.display = 'block';
        }
    }

    function highlightGalleryItems(searchTerm) {
        galleryItems.forEach(item => {
            const itemName = item.getAttribute('data-name').toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.classList.add('highlight');
                item.classList.remove('fade');
                galleryRow.prepend(item); 
            } else {
                item.classList.remove('highlight');
                item.classList.add('fade');
            }
        });

        if (searchTerm === '') {
            galleryItems.forEach(item => {
                item.classList.remove('highlight', 'fade');
            });
            
            Array.from(galleryItems)
                .sort((a, b) => parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order')))
                .forEach(item => galleryRow.appendChild(item));
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});
  
  
   const dropdowns = document.querySelectorAll('.nav-item.dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdowns.forEach(d => {
            if (d !== dropdown) {
                d.querySelector('.dropdown-menu').classList.remove('show');
            }
        });
        menu.classList.toggle('show');
    });

   
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.remove('show');
        }
    });
});

 
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.progress');
    const loadingText = document.querySelector('.loading-text');
    let dots = '';
    let dotCount = 0;

    
    const textInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        dots = '.'.repeat(dotCount);
        loadingText.textContent = 'Loading' + dots.padEnd(3, ' ');
    }, 500); 

    
    let width = 0;
    const progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
        } else {
            width += 1.67; 
            progress.style.width = width + '%';
        }
    }, 50);

    setTimeout(() => {
        clearInterval(textInterval);
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 800); 
    }, 3000);
});