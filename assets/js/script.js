const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.hidden')

elements.forEach((element) => myObserver.observe(element))

let currentIndex = 0;
let isHovering = false;

function createFlipHandler(images) {
  return function() {
    if (!isHovering) return;
    
    images[currentIndex].classList.remove('active');
    images[currentIndex].classList.add('prev');
    
    currentIndex = (currentIndex + 1) % images.length;
    
    images[currentIndex].classList.add('active');
    images[currentIndex].classList.remove('prev');
  };
}

function setupFlipOnHover() {
  const flipCard = document.querySelector('.flip-card');
  const images = document.querySelectorAll('.flip-image');
  
  if (!flipCard || images.length === 0) return;

  const flip = createFlipHandler(images);
  
  flipCard.addEventListener('mouseenter', () => {
    isHovering = true;
    flip(); // Primeira transição imediata
    flipCard.flipInterval = setInterval(flip, 2000); // Troca a cada 2s
  });

  flipCard.addEventListener('mouseleave', () => {
    isHovering = false;
    clearInterval(flipCard.flipInterval);
    // Reseta para a primeira imagem
    images.forEach(img => img.classList.remove('active', 'prev'));
    currentIndex = 0;
    images[0].classList.add('active');
  });
}

// Ativa quando o elemento estiver visível
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      setupFlipOnHover();
    }
  });
});

document.querySelectorAll('.flip-card').forEach(card => {
  observer.observe(card);
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    // Adiciona/remove classe ao rolar
    if(scrollPosition > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Ajuste dinâmico do padding
    document.body.style.paddingTop = navbar.offsetHeight + 'px';
  });