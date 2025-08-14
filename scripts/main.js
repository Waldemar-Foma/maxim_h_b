document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const jokes = document.querySelectorAll('.joke');
    let currentJoke = Math.floor(Math.random() * jokes.length);
    let jokeInterval;
    
    // Функция для смены анекдота с анимацией
    function showNextJoke() {
        // Плавно скрываем текущий анекдот
        jokes[currentJoke].style.opacity = '0';
        
        setTimeout(() => {
            jokes[currentJoke].classList.remove('active');
            jokes[currentJoke].style.opacity = '';
            
            // Выбираем следующий случайный анекдот (не повторяя предыдущий)
            let nextJoke;
            do {
                nextJoke = Math.floor(Math.random() * jokes.length);
            } while (nextJoke === currentJoke && jokes.length > 1);
            
            currentJoke = nextJoke;
            
            // Показываем новый анекдот
            jokes[currentJoke].classList.add('active');
            setTimeout(() => {
                jokes[currentJoke].style.opacity = '1';
            }, 10);
        }, 500); // Время должно совпадать с CSS transition
    }
    
    // Сначала скрываем все анекдоты
    jokes.forEach(joke => {
        joke.style.display = 'none';
        joke.style.opacity = '0';
        joke.style.transition = 'opacity 0.5s ease';
    });
    
    // Показываем первый случайный анекдот сразу
    jokes[currentJoke].style.display = 'block';
    jokes[currentJoke].classList.add('active');
    setTimeout(() => {
        jokes[currentJoke].style.opacity = '1';
    }, 10);
    
    // Rotate jokes every 3 seconds
    jokeInterval = setInterval(showNextJoke, 3000);
    
    // Hide loading screen after 3 seconds
    const loadingTimeout = setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            clearInterval(jokeInterval);
        }, 500);
    }, 3000);
    
    
    // Если загрузка затянулась, продолжаем менять анекдоты
    // Например, если есть какие-то тяжелые ресурсы для загрузки
    window.addEventListener('load', function() {
        // Если страница загрузилась до истечения 3 секунд, таймер сам очистится
        // Если загрузка длилась дольше, этот код выполнится после основного таймера
        // и нам не нужно ничего делать
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#FF6B35", "#00C49A", "#004E89"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#FF6B35",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
    // Tab switching
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items and tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load gallery images
    const galleryGrid = document.getElementById('gallery-grid');
    const photoModal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    // In a real project, you would fetch these from a server
    const galleryImages = [];
    for (let i = 1; i <= 34; i++) {
        galleryImages.push({
            src: `more/pic/photo${i}.jpg`,
            title: `Момент ${i}`
        });
    }
    
    let currentImageIndex = 0;
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <h3>${image.title}</h3>
        `;
        
        galleryItem.addEventListener('click', () => {
            currentImageIndex = index;
            modalImage.src = image.src;
            modalImage.alt = image.title;
            photoModal.classList.add('active');
        });
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        photoModal.classList.remove('active');
    });
    
    // Navigation in modal
    modalPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImage.src = galleryImages[currentImageIndex].src;
        modalImage.alt = galleryImages[currentImageIndex].title;
    });
    
    modalNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImage.src = galleryImages[currentImageIndex].src;
        modalImage.alt = galleryImages[currentImageIndex].title;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (photoModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                modalPrev.click();
            } else if (e.key === 'ArrowRight') {
                modalNext.click();
            } else if (e.key === 'Escape') {
                modalClose.click();
            }
        }
    });
    
    // Surprise video
    const playButton = document.getElementById('play-surprise');
    const videoContainer = document.getElementById('video-container');
    const surpriseVideo = document.getElementById('surprise-video');
    
    playButton.addEventListener('click', function() {
        this.style.display = 'none';
        videoContainer.classList.add('active');
        surpriseVideo.play();
        
        // Add confetti effect
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    });
    
    // Reset surprise when tab changes
    document.querySelector('[data-tab="surprise"]').addEventListener('click', function() {
        videoContainer.classList.remove('active');
        surpriseVideo.pause();
        surpriseVideo.currentTime = 0;
        playButton.style.display = 'inline-block';
    });
    
    // Add floating cursor effect
    document.addEventListener('mousemove', function(e) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.position = 'fixed';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'rgba(255, 107, 53, 0.5)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursor);
        
        // Remove after animation
        setTimeout(() => {
            cursor.style.opacity = '0';
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                cursor.remove();
            }, 500);
        }, 100);
    });
});