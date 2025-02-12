let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let lastScrollPosition = window.pageYOffset;
let isScrolling = false;
const buttonContainer = document.querySelector('.button-container');

// Tambahkan di bagian atas file, setelah deklarasi variabel
document.documentElement.style.backgroundColor = '#F4F4F4';

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    
    // Tambahkan fade out untuk item yang akan hilang
    items.forEach(item => {
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    // Berikan waktu lebih lama untuk transisi
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 1000);
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});

// Update fungsi typeText untuk animasi text yang lebih halus
function typeText(element, delay) {
    if (!element) return;
    
    const text = element.textContent;
    element.style.opacity = '0';
    element.innerHTML = '';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.classList.add('typing-text');
        element.textContent = text;
    }, delay * 1000);
}

// Update fungsi initializeTypingAnimation dengan delay yang lebih lama
function initializeTypingAnimation() {
    const activeItem = document.querySelector('.carousel .list .item:nth-child(2)');
    if (!activeItem) return;
    
    const title = activeItem.querySelector('.introduce .title');
    const description = activeItem.querySelector('.introduce .des');
    const image = activeItem.querySelector('img');
    
    // Reset dan mulai animasi untuk gambar
    if (image) {
        image.style.opacity = '0';
        void image.offsetWidth;
        image.style.animation = 'none';
        void image.offsetWidth;
        image.style.animation = 'fadeIn 0.8s ease forwards';
        image.style.animationDelay = '0.5s';
    }
    
    // Reset dan mulai animasi untuk teks dengan delay yang lebih lama
    if (title) {
        title.innerHTML = title.textContent;
        typeText(title, 1); 
    }
    
    if (description) {
        description.innerHTML = description.textContent;
        typeText(description, 1.5); 
    }
}

// Tambahkan event listener untuk carousel navigation
document.getElementById('prev')?.addEventListener('click', () => {
    setTimeout(initializeTypingAnimation, 100);
});

document.getElementById('next')?.addEventListener('click', () => {
    setTimeout(initializeTypingAnimation, 100);
});

// Update event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Sembunyikan loader jika ada
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    initializeTypingAnimation();
    
    // Hapus pengaturan visibility dan opacity karena sudah diatur di CSS
    if (buttonContainer) {
        buttonContainer.classList.remove('hidden');
    }
});

// Fungsi untuk mengontrol visibilitas button container
function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScrollPosition = window.pageYOffset;
            const scrollingDown = currentScrollPosition > lastScrollPosition;
            
            // Jika scroll ke bawah dan tidak di bagian atas, sembunyikan
            if (scrollingDown && currentScrollPosition > 100) {
                buttonContainer.classList.add('hidden');
            } else {
                buttonContainer.classList.remove('hidden');
            }
            
            lastScrollPosition = currentScrollPosition;
            isScrolling = false;
        });
    }
    isScrolling = true;
}

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', handleScroll, { passive: true });

// Tambahkan debounce untuk menampilkan kembali button setelah scroll berhenti
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        buttonContainer.classList.remove('hidden');
    }, 1000);
}, { passive: true });

// Update posisi button container saat resize window
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        buttonContainer.style.bottom = '20px';
    } else {
        buttonContainer.style.bottom = '40px';
    }
}, { passive: true });