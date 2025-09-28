// Focus text animation
const focusTexts = ['Software Engineer', 'Hobbyist Photographer', 'Arts & Crafts'];
let currentFocusIndex = 0;

const focusElement = document.getElementById('focusText');

function triggerFocus() {
    // Start blur (out of focus)
    focusElement.classList.add('focusing');
    
    setTimeout(() => {
        // Change text while blurred
        currentFocusIndex = (currentFocusIndex + 1) % focusTexts.length;
        const newText = focusTexts[currentFocusIndex];
        focusElement.textContent = newText;
        
        // Remove focusing class and add focus hunting animation
        focusElement.classList.remove('focusing');
        focusElement.classList.add('focus-hunt');
        
        setTimeout(() => {
            focusElement.classList.remove('focus-hunt');
        }, 800);
    }, 300);
}

// Start focus animation cycle
setTimeout(() => {
    triggerFocus();
    setInterval(triggerFocus, 3500); // Focus change every 3.5 seconds
}, 2000); // Wait 2 seconds before first focus change

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    
    body.classList.toggle('dark');
    btn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    
    localStorage.setItem('darkMode', body.classList.contains('dark'));
}

// Load saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('themeBtn').textContent = '☀️';
}

// Enhanced tab switching with directional animations (for homepage)
if (document.querySelector('.tab-btn')) {
    let previousTabIndex = 0;
    const tabOrder = ['about', 'blog', 'photography', 'projects', 'resume', 'contact'];
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            const currentTabIndex = tabOrder.indexOf(targetTab);
            
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show target content with directional animation
            tabContents.forEach(content => {
                content.classList.remove('active', 'slide-left');
            });
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Add slide direction based on tab order
                if (currentTabIndex < previousTabIndex) {
                    targetContent.classList.add('slide-left');
                }
                
                previousTabIndex = currentTabIndex;
            }
        });
    });
} 

// Lightbox functionality
function openLightbox(photoElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxSpecs = document.getElementById('lightboxSpecs');
    const lightboxLocation = document.getElementById('lightboxLocation');
    
    if (!lightbox) {
        console.error('Lightbox element not found!');
        return;
    }
    
    const overlay = photoElement.querySelector('.photo-overlay');
    if (!overlay) {
        console.error('Photo overlay not found!');
        return;
    }
    
    const title = overlay.querySelector('.photo-title')?.textContent || 'Photo';
    const specs = overlay.querySelector('.photo-specs')?.textContent || '';
    const location = overlay.querySelector('.photo-location')?.textContent || '';
    
    // Check if it's a real image or placeholder
    const thumbnailImg = photoElement.querySelector('img');
    const placeholder = photoElement.querySelector('.photo-placeholder');
    
    // Clear the lightbox image
    lightboxImage.innerHTML = '';
    lightboxImage.className = 'lightbox-image';
    
    if (thumbnailImg) {
        // Real image - create img element
        const fullImg = document.createElement('img');
        fullImg.src = thumbnailImg.src;
        fullImg.alt = title;
        fullImg.style.width = '100%';
        fullImg.style.height = '100%';
        fullImg.style.objectFit = 'contain';
        fullImg.style.borderRadius = '8px';
        lightboxImage.appendChild(fullImg);
    } else if (placeholder) {
        // Placeholder - copy the gradient background
        lightboxImage.className = placeholder.className.replace('photo-placeholder', 'lightbox-image');
        lightboxImage.textContent = placeholder.textContent;
    } else {
        // Fallback
        lightboxImage.style.background = 'var(--card-dark)';
        lightboxImage.textContent = 'Image not found';
    }
    
    lightboxTitle.textContent = title;
    lightboxSpecs.textContent = specs;
    lightboxLocation.textContent = location;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ESC key to close lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Filter functionality - updated for both sections
function setupFilters(section) {
    const filterBtns = document.querySelectorAll(`#${section} .filter-btn[data-section="${section}"]`);
    const items = section === 'photography' 
        ? document.querySelectorAll(`#${section} .photo-item`)
        : document.querySelectorAll(`#${section} .project-card`);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize filters for both photography and projects (if they exist)
if (document.querySelector('#photography')) {
    setupFilters('photography');
}
if (document.querySelector('#projects')) {
    setupFilters('projects');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should fade in
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.blog-post, .photo-item, .project-card, .post-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});