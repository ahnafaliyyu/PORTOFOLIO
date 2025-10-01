// Contact input click effect
document.querySelectorAll('.contact-input').forEach(input => {
	input.addEventListener('focus', function() {
		this.classList.add('selected');
	});
	input.addEventListener('blur', function() {
		this.classList.remove('selected');
	});
});
// Journey card click effect
document.querySelectorAll('.journey-card').forEach(card => {
	card.addEventListener('mousedown', function() {
		document.querySelectorAll('.journey-card').forEach(c => c.classList.remove('selected'));
		this.classList.add('selected');
	});
	card.addEventListener('touchstart', function() {
		document.querySelectorAll('.journey-card').forEach(c => c.classList.remove('selected'));
		this.classList.add('selected');
	});
});


// Typing effect for job title
const typingText = 'Web Developer';
const typingElement = document.querySelector('.typing-effect');
let typingIndex = 0;
function typeEffect() {
	if (typingElement && typingIndex <= typingText.length) {
		typingElement.textContent = typingText.slice(0, typingIndex);
		typingIndex++;
		setTimeout(typeEffect, 120);
	}
}
typeEffect();

// Typing effect for About Me section
const typingTextAboutEl = document.querySelector('.typing-text-about');
if (typingTextAboutEl) {
    const words = ["UI/UX Designer", "Front End Developer", "Web Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeAbout() {
        const currentWord = words[wordIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex--);
        } else {
            displayText = currentWord.substring(0, charIndex++);
        }

        // Add blue color to "Front End Developer"
        if (currentWord === "Front End Developer") {
            typingTextAboutEl.innerHTML = `<span class="typed-text-about">${displayText}</span>`;
        } else {
            typingTextAboutEl.textContent = displayText;
        }

        let typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeAbout, typeSpeed);
    }
    typeAbout();
}

// General scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Hamburger menu toggle & close on link click (mobile)
const hamburger = document.getElementById('hamburger-menu');
const navbar = document.querySelector('.navbar');

if (hamburger && navbar) {
	hamburger.addEventListener('click', (e) => {
		e.stopPropagation();
		navbar.classList.toggle('open');
		hamburger.classList.toggle('open');
		document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : 'auto';
	});

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
			navbar.classList.remove('open');
			hamburger.classList.remove('open');
			document.body.style.overflow = 'auto';
		}
	});

	// Enhanced smooth scroll for navbar links
	document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
		link.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href').substring(1);
			const target = document.getElementById(targetId);
			
			if (target) {
				e.preventDefault();
				
				// Close mobile menu
				navbar.classList.remove('open');
				hamburger.classList.remove('open');
				document.body.style.overflow = 'auto';
				
				// Smooth scroll with offset for fixed header
				const headerHeight = document.querySelector('header').offsetHeight;
				const targetPosition = target.offsetTop - headerHeight - 20;
				
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
}

// Navbar active link on scroll - Improved
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};


// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Initialize cursor positions to the center of the screen
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let outlineX = window.innerWidth / 2;
let outlineY = window.innerHeight / 2;

// Make cursor visible on load
if (cursorDot && cursorOutline) {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
}

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animation loop for the spring effect
function animateCursor() {
    if (!cursorDot || !cursorOutline) return;
    // Calculate distance between outline and mouse
    const dx = mouseX - outlineX;
    const dy = mouseY - outlineY;

    // Move the outline towards the mouse with a spring-like delay (lerp)
    outlineX += dx * 0.15; // Increased speed slightly for better feel
    outlineY += dy * 0.15;

    // Update both dot and outline positions
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
}

// Start the animation loop
animateCursor();


// Add hover effect for links, buttons, etc.
const interactiveElements = document.querySelectorAll('a, button, .journey-card, .skill-item, .project-box, .social-icon');
interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
        document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseout', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// Hide cursor when it leaves the window
document.addEventListener('mouseout', (e) => {
    if (!cursorDot || !cursorOutline) return;
    // Check if the mouse has left the viewport
    if (!e.relatedTarget && !e.toElement) {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    }
});

// Show cursor when it enters the window
document.addEventListener('mouseover', () => {
    if (!cursorDot || !cursorOutline) return;
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
});


const toggleBtn = document.getElementById('dark-toggle');
const body = document.body;

// Cek preferensi sebelumnya
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  // Simpan preferensi ke localStorage
  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Parallax effect
const decorCircle = document.querySelector('.decor-circle');
const decorRect = document.querySelector('.decor-rect');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (decorCircle) {
        decorCircle.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    if (decorRect) {
        decorRect.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
});

// 3D Tilt Effect
document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
