// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const address = document.getElementById('address').value;
        const notes = document.getElementById('notes').value;
        
        // Get current time for greeting
        const now = new Date();
        const hours = now.getHours();
        let greeting = 'Selamat ';
        
        if (hours >= 3 && hours < 10) greeting += 'Pagi';
        else if (hours >= 10 && hours < 15) greeting += 'Siang';
        else if (hours >= 15 && hours < 19) greeting += 'Sore';
        else greeting += 'Malam';
        
        // Create WhatsApp message with proper formatting
        const message = `${greeting} Bapak/Ibu AC Jaya,%0A%0ASaya ingin memesan layanan service AC dengan detail sebagai berikut:%0A%0A• Nama: ${name}%0A• No. WhatsApp: ${phone}%0A• Jenis Layanan: ${service}%0A• Tanggal: ${date}%0A• Alamat: ${address}%0A• Catatan: ${notes || 'Tidak ada'}%0A%0ATerima kasih atas pelayanannya. Saya tunggu konfirmasinya.%0A%0ASalam,%0A${name}`;
        
        const whatsappUrl = `https://wa.me/6285960035570?text=${message}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    });
}

// Set minimum date for booking to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, #about img');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate-fade-in');
        }
    });
}

// Initial check on page load
window.addEventListener('load', animateOnScroll);
// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Initialize AOS (Animate On Scroll) for elements
function initAOS() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
}

// Call initialization functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    animateOnScroll();
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-200', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-200', 'font-semibold');
        }
    });
});

