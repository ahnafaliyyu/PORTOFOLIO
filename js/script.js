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

// Improved skills animation with Intersection Observer
function initSkillsAnimation() {
	const skillProgressBars = document.querySelectorAll('.skill-progress');
	const skillItems = document.querySelectorAll('.skill-item');
	
	if (skillProgressBars.length === 0) return;
	
	const observerOptions = {
		threshold: 0.3,
		rootMargin: '0px 0px -100px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Animate all skill bars when skills section comes into view
				skillProgressBars.forEach((bar, index) => {
					setTimeout(() => {
						if (bar.classList.contains('html')) bar.style.width = '90%';
						else if (bar.classList.contains('css')) bar.style.width = '85%';
						else if (bar.classList.contains('js')) bar.style.width = '75%';
						else if (bar.classList.contains('uiux')) bar.style.width = '70%';
						else if (bar.classList.contains('react')) bar.style.width = '65%';
						else if (bar.classList.contains('nodejs')) bar.style.width = '60%';
					}, index * 200); // Stagger animation
				});
				
				// Add entrance animation to skill items
				skillItems.forEach((item, index) => {
					setTimeout(() => {
						item.style.opacity = '1';
						item.style.transform = 'translateY(0)';
					}, index * 150);
				});
			}
		});
	}, observerOptions);
	
	const skillsSection = document.querySelector('.skills');
	if (skillsSection) {
		observer.observe(skillsSection);
		
		// Set initial state for skill items
		skillItems.forEach(item => {
			item.style.opacity = '0';
			item.style.transform = 'translateY(30px)';
			item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		});
	}
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initSkillsAnimation);

// Smooth scroll for navbar links


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
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

function updateActiveNav() {
	let current = 'home'; // default to home
	const scrollPos = window.scrollY + 150; // offset untuk header

	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute('id');
		
		if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
			current = sectionId;
		}
	});

	// Update active class
	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === '#' + current) {
			link.classList.add('active');
		}
	});
}

// Listen to scroll events
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);


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

