// ========== HOMEPAGE INTERACTIVITY ==========
// Explore Hub - Homepage JavaScript
// Author: Precious

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Explore Hub Homepage - Ready to explore!');
    
    // 1. Dynamic year in footer (auto-updates)
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
        const currentYear = new Date().getFullYear();
        footerCopy.innerHTML = `© ${currentYear} Explore Hub. All rights reserved.`;
    }
    
    // 2. Hover effect on featured cards (with console log)
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const destinationName = card.querySelector('h3')?.innerText;
            console.log(`Exploring: ${destinationName}`);
        });
    });
    
    // 3. Smooth scroll for navigation buttons
    const viewCollectionsBtn = document.querySelector('.btn-secondary');
    if (viewCollectionsBtn) {
        viewCollectionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const curatedSection = document.querySelector('.curated');
            if (curatedSection) {
                curatedSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // 4. Hero section fade-in effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        setTimeout(function() {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 5. Simple alert when "START EXPLORING" is clicked (shows functionality)
    const startBtn = document.querySelector('.btn-primary');
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            // Only show message if user is already on homepage
            console.log('User clicked Start Exploring - redirecting to Browse page');
        });
    }
    
    // 6. Add a welcome message in console
    console.log(' Welcome to Explore Hub - Your journey starts here! ');
});