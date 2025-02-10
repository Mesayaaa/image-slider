let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');

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
    
    // Reset opacity hanya untuk gambar yang akan menjadi aktif
    const nextActiveItem = type === 'next' ? items[1] : items[0];
    if (nextActiveItem) {
        const img = nextActiveItem.querySelector('img');
        if (img) {
            img.style.opacity = '0';
        }
    }

    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});

// Update fungsi typeText dengan delay yang lebih lama
function typeText(element, delay = 0) {
    if (!element) return;
    
    const text = element.textContent.trim();
    element.textContent = '';
    element.style.visibility = 'visible';
    
    // Buat container untuk menyimpan semua span
    const container = document.createElement('div');
    container.style.display = 'inline';
    
    // Pisahkan teks menjadi kata-kata
    const words = text.split(' ');
    
    words.forEach((word, index) => {
        // Buat span untuk kata
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'typing-text';
        span.style.animationDelay = `${delay + (index * 0.18)}s`;
        container.appendChild(span);
        
        if (index < words.length - 1) {
            const space = document.createElement('span');
            space.textContent = ' ';
            space.className = 'typing-text';
            space.style.animationDelay = `${delay + (index * 0.2)}s`;
            container.appendChild(space);
        }
    });
    
    element.appendChild(container);
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

// Initialize pada load
document.addEventListener('DOMContentLoaded', () => {
    initializeTypingAnimation();
});