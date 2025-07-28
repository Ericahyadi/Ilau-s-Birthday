// Music control functionality (commented out since audio elements were removed)
// const music = document.getElementById('bg-music');
// const control = document.getElementById('musicControl');

// control.addEventListener('click', () => {
//   if (music.paused) {
//     music.play();
//     control.textContent = '♪';
//   } else {
//     music.pause();
//     control.textContent = '❚❚';
//   }
// });

// Typing animation
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      // Handle line breaks and spaces properly
      const char = text.charAt(i);
      if (char === '\n') {
        element.innerHTML += '\n';
      } else {
        element.innerHTML += char;
      }
      i++;
      setTimeout(type, speed);
    } else {
      // Remove the blinking cursor after typing is complete
      element.classList.add('typing-complete');
    }
  }
  
  type();
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing');
  
  if (typingElement) {
    const originalText = typingElement.textContent;
    console.log('Typing element found, starting animation...');
    console.log('Text length:', originalText.length);
    console.log('Text content:', originalText);
    
    // Start the JavaScript typing animation
    typeWriter(typingElement, originalText, 30);
  } else {
    console.log('Typing element not found');
  }
  
  // Add scroll animations
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
  
  // Observe sections for scroll animations
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
  });
  
  // Add hover effects to gallery images
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'translateY(0) scale(1)';
    });
  });
});
