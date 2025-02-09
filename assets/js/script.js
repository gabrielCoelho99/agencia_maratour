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

function createFlipHandler(images) {
  return function() {
    images[currentIndex].classList.remove('active');
    images[currentIndex].classList.add('prev');
    
    currentIndex = (currentIndex + 1) % images.length;
    
    images[currentIndex].classList.add('active');
    images[currentIndex].classList.remove('prev');
  };
}

function setupAutoFlip() {
  const images = document.querySelectorAll('.flip-image');
  if (images.length === 0) return;

  const flip = createFlipHandler(images);
  setInterval(flip, 3000); // Troca a cada 2s automaticamente
}

// Ativa quando o elemento estiver visível
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      setupAutoFlip();
      observer.unobserve(entry.target); // Garante que o script não seja reiniciado
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


document.getElementById('travelRegistration').onsubmit = function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        destination: this.destination.value,
        departure: this.departure.value,
        travelers: this.travelers.value,
        notes: this.notes.value
    };

    console.log('Dados da viagem:', formData);
    alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
    
    this.reset();
};
