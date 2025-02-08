// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with updated settings
    AOS.init({
        duration: 1000,
        once: false, // Makes animations play every time
        mirror: true, // Enables animations when scrolling up
        offset: 100, // Offset (in px) from the original trigger point
        delay: 0, // Values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // Default easing for AOS animations
        anchorPlacement: 'top-bottom' // Defines which position of the element regarding to window should trigger the animation
    });

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const homeTitle = document.getElementById('home-title');
    const aboutSection = document.querySelector('.about-section');
    
    let currentIndex = 0;
    // Initial state
    prevBtn.style.display = 'none';
    slides[0].style.display = 'block';
    
    // Slide functionality
    nextBtn.addEventListener('click', () => {
        slides[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.display = 'block';
        prevBtn.style.display = 'flex';
    });
    
    prevBtn.addEventListener('click', () => {
        slides[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].style.display = 'block';
        if (currentIndex === 0) {
            prevBtn.style.display = 'none';
        }
    });
    
    // Sidebar functionality
    document.getElementById('hamburger').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('-translate-x-full');
        
        if (sidebar.classList.contains('-translate-x-full')) {
            homeTitle.style.left = '4rem';
        } else {
            homeTitle.style.left = '17rem';
        }
    });
    
    // Scroll observer for section visibility and header text change
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Update active state in navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', 
                        link.getAttribute('href') === `#${sectionId}`);
                });
                
                // Update header text based on visible section
                if (sectionId === 'about') {
                    homeTitle.textContent = 'About';
                    document.title = 'About Us';
                } else if (sectionId === 'home') {
                    homeTitle.textContent = 'Home';
                    document.title = 'Home';
                } else if (sectionId === 'memories') {
                    homeTitle.textContent = 'Memories';
                    document.title = 'Memories';
                }
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '-50% 0px -50% 0px' // This helps with more accurate section detection
    });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update title based on clicked link
                const sectionId = this.getAttribute('href').substring(1);
                if (sectionId === 'about') {
                    homeTitle.textContent = 'About';
                    document.title = 'About Us';
                } else if (sectionId === 'home') {
                    homeTitle.textContent = 'Home';
                    document.title = 'Home';
                } else if (sectionId === 'memories') {
                    homeTitle.textContent = 'Memories';
                    document.title = 'Memories';
                }
                else if (sectionId === 'present') {
                    homeTitle.textContent = 'Present';
                    document.title = 'Present';
                }
            }
        });
    });
});

// About section slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const aboutSlides = document.querySelectorAll('.about-slide');
    const aboutPrevBtn = document.querySelector('.about-slider-container .prev-btn');
    const aboutNextBtn = document.querySelector('.about-slider-container .next-btn');
    
    let aboutCurrentIndex = 0;
    
    // Initial state
    if (aboutPrevBtn && aboutNextBtn && aboutSlides.length > 0) {
        aboutPrevBtn.style.display = 'none';
        aboutSlides[0].style.display = 'block';
        
        // Next button functionality
        aboutNextBtn.addEventListener('click', () => {
            aboutSlides[aboutCurrentIndex].style.display = 'none';
            aboutCurrentIndex = (aboutCurrentIndex + 1) % aboutSlides.length;
            aboutSlides[aboutCurrentIndex].style.display = 'block';
            aboutPrevBtn.style.display = 'flex';
            
            if (aboutCurrentIndex === aboutSlides.length - 1) {
                aboutNextBtn.style.display = 'none';
            }
        });
        
        // Previous button functionality
        aboutPrevBtn.addEventListener('click', () => {
            aboutSlides[aboutCurrentIndex].style.display = 'none';
            aboutCurrentIndex = (aboutCurrentIndex - 1 + aboutSlides.length) % aboutSlides.length;
            aboutSlides[aboutCurrentIndex].style.display = 'block';
            aboutNextBtn.style.display = 'flex';
            
            if (aboutCurrentIndex === 0) {
                aboutPrevBtn.style.display = 'none';
            }
        });
    }
});
// Scroll Animation Functionality
function applyScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of card is visible
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}
// Call after rendering cards
function renderCards(cards) {
    cardGrid.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}">
            <div class="card-content">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
            </div>
        `;
        cardElement.addEventListener('click', () => openModal(card));
        cardGrid.appendChild(cardElement);
    });
    
    // Apply scroll animation after rendering
    applyScrollAnimation();
}

// Add this to your script.js file
const presentPasswords = {
    1: "hapidketua", // Password untuk hadiah pertama
    2: "dinikentut", // Password untuk hadiah kedua
    3: "cindykodok"  // Password untuk hadiah ketiga
};

const presentUrls = {
    1: "/Dini/hapid.html",
    2: "/Dini/dini.html",
    3: "/Dini/cindy.html"
};

function checkPassword(presentId) {
    const passwordInput = document.querySelector(`input[data-present-id="${presentId}"]`);
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === presentPasswords[presentId]) {
        // Password benar, arahkan ke URL hadiah
        window.location.href = presentUrls[presentId];
    } else {
        // Password salah, tampilkan pesan error
        alert("Wrong password! Please try again.");
        passwordInput.value = ""; // Clear input
    }
}

// Tambahkan event listener untuk tombol Enter
document.addEventListener('DOMContentLoaded', () => {
    const passwordInputs = document.querySelectorAll('.password-input');
    
    passwordInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const presentId = parseInt(input.getAttribute('data-present-id'));
                checkPassword(presentId);
            }
        });
    });
});
// Music player functionality
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    let isPlaying = false;
    let isMuted = false;

    // Function to play music
    function playMusic() {
        audio.play().then(() => {
            isPlaying = true;
            updatePlayPauseButton();
        }).catch(error => {
            console.log("Autoplay prevented:", error);
            isPlaying = false;
            updatePlayPauseButton();
        });
    }

    // Function to pause music
    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updatePlayPauseButton();
    }

    // Update play/pause button icon
    function updatePlayPauseButton() {
        playPauseBtn.innerHTML = isPlaying ? `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ` : `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;
    }

    // Update mute button icon
    function updateMuteButton() {
        muteBtn.innerHTML = isMuted ? `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
        ` : `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        `;
    }

    // Play/Pause button click handler
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // Mute button click handler
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        updateMuteButton();
    });

    // Handle audio ended event
    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });

    // Attempt autoplay when page loads
    try {
        playMusic();
    } catch (err) {
        console.log("Autoplay error:", err);
        isPlaying = false;
        updatePlayPauseButton();
    }

    // Handle visibility change to pause/play music
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            pauseMusic();
        }
    });

    // Initialize button states
    updatePlayPauseButton();
    updateMuteButton();
});


