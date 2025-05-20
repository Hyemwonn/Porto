document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateDarkModeButton(currentTheme);
    }
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateDarkModeButton('light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateDarkModeButton('dark');
        }
    });
    
    function updateDarkModeButton(theme) {
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            text.textContent = 'Light Mode';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            text.textContent = 'Dark Mode';
        }
    }
    
    // Music Player
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let musicPlaying = false;
    
    // Check for music autoplay preference
    const musicPreference = localStorage.getItem('musicPreference');
    if (musicPreference === 'enabled') {
        toggleMusic();
    }
    
    musicToggle.addEventListener('click', toggleMusic);
    
    function toggleMusic() {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.querySelector('span').textContent = 'Play Music';
            localStorage.setItem('musicPreference', 'disabled');
        } else {
            bgMusic.play().catch(e => {
                console.log("Autoplay prevented. Please interact with the page first.");
                musicToggle.textContent = "Click to Play Music";
            });
            musicToggle.querySelector('span').textContent = 'Pause Music';
            localStorage.setItem('musicPreference', 'enabled');
        }
        musicPlaying = !musicPlaying;
    }
    
    // Create floating flowers
    const floatingFlowers = document.querySelector('.floating-flowers');
    for (let i = 0; i < 10; i++) {
        const flower = document.createElement('div');
        flower.style.position = 'absolute';
        flower.style.width = (Math.random() * 20 + 10) + 'px';
        flower.style.height = flower.style.width;
        flower.style.backgroundImage = 'url(images/pixel-flower.png)';
        flower.style.backgroundSize = 'contain';
        flower.style.imageRendering = 'pixelated';
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.top = Math.random() * 100 + 'vh';
        flower.style.opacity = '0';
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        flower.style.animation = `float ${duration}s linear ${delay}s infinite`;
        if (i % 2 === 0) {
            flower.style.animationDirection = 'reverse';
        }
        
        floatingFlowers.appendChild(flower);
    }
    
    // Typing animation for title
    const title = document.querySelector('.pixel-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
    
    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 2s ease';
        }, 500);
    });
});