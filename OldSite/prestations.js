// Convert vertical scroll to horizontal scroll for carousels
const carousels = document.querySelectorAll('.images-carousel');

document.addEventListener('wheel', (e) => {
    const carousel = Array.from(carousels).find(c => c.contains(e.target));
    
    if (carousel) {
        // Check if carousel can scroll in the direction of the wheel
        const canScrollRight = carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth;
        const canScrollLeft = carousel.scrollLeft > 0;
        const isScrollingDown = e.deltaY > 0;
        
        // Only prevent default and scroll horizontally if carousel can scroll in that direction
        if ((isScrollingDown && canScrollRight) || (!isScrollingDown && canScrollLeft)) {
            carousel.scrollLeft += e.deltaY;
            e.preventDefault();
        }
        // If carousel is at the end/beginning, allow vertical scroll to pass through
    }
}, { passive: false });
