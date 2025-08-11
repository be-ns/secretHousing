// Carousel functionality for the Flask version
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const prevButton = carousel.querySelector('.carousel-button.prev');
  const nextButton = carousel.querySelector('.carousel-button.next');
  if (!track || !prevButton || !nextButton) return;
  let index = 0;
  const card = track.querySelector('.plant-card');
  if (!card) return;
  // compute width including margin; assuming margin set in CSS (1rem)
  const cardStyle = window.getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
  const visibleCards = Math.floor((carousel.offsetWidth) / cardWidth) || 1;
  const totalCards = track.children.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);
  function updateTransform() {
    const translateX = -index * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
  }
  prevButton.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    updateTransform();
  });
  nextButton.addEventListener('click', () => {
    index = Math.min(maxIndex, index + 1);
    updateTransform();
  });
});