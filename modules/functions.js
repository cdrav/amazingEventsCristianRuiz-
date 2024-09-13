// Función para obtener los eventos de la API
async function fetchEvents() {
    const response = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
    const data = await response.json();
    return data.events; // Ajusta si la estructura de los datos es diferente
  }
  
  // Función para filtrar y mostrar los eventos según la página actual
  async function displayEvents() {
    const events = await fetchEvents();
    
    const page = document.body.dataset.page; // Utiliza un atributo de datos en el cuerpo para determinar la página actual
    
    let filteredEvents;
    
    if (page === 'home') {
      filteredEvents = events; // Muestra todos los eventos en la página de inicio
    } else if (page === 'upcoming') {
      const currentDate = new Date();
      filteredEvents = events.filter(event => new Date(event.date) > currentDate); // Filtra eventos futuros
    } else if (page === 'past') {
      const currentDate = new Date();
      filteredEvents = events.filter(event => new Date(event.date) <= currentDate); // Filtra eventos pasados
    }
  
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = ''; // Limpia el contenedor
  
    filteredEvents.forEach(event => {
      // Crea y agrega tarjetas de eventos al contenedor
      const eventCard = document.createElement('div');
      eventCard.classList.add('col-md-4', 'mb-4');
      eventCard.innerHTML = `
        <div class="card">
          <img src="${event.image}" class="card-img-top" alt="${event.title}">
          <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text">${event.description}</p>
            <p class="card-text"><small class="text-muted">${event.date}</small></p>
          </div>
        </div>
      `;
      eventsContainer.appendChild(eventCard);
    });
  }
  
  // Llama a displayEvents cuando se cargue la página
  document.addEventListener('DOMContentLoaded', displayEvents);
  