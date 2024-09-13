document.addEventListener('DOMContentLoaded', () => {
    // Capturar el ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    console.log('Event ID from URL:', eventId); // Mensaje de depuración
  
    // Función para obtener los eventos de la API
    function fetchEvents() {
      return fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched events:', data.events); // Mensaje de depuración
          return data.events;
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          return [];
        });
    }
  
    // Función para mostrar los detalles del evento
    function displayEventDetails() {
      fetchEvents().then(events => {
        const event = events.find(event => event._id === eventId);
        console.log('Found event:', event); // Mensaje de depuración
  
        // Si se encuentra el evento, mostrar los detalles
        if (event) {
          document.getElementById('event-name').textContent = event.name;
          document.getElementById('event-image').src = event.image;
          document.getElementById('event-date').textContent = new Date(event.date).toLocaleDateString(); // Formato de fecha
          document.getElementById('event-description').textContent = event.description;
          document.getElementById('event-category').textContent = event.category;
          document.getElementById('event-place').textContent = event.place;
          document.getElementById('event-capacity').textContent = event.capacity;
          document.getElementById('event-attendance').textContent = event.attendance ? event.attendance : 'N/A'; // Muestra 'N/A' si no hay asistencia
          document.getElementById('event-price').textContent = `$${event.price}`;
        } else {
          // Manejar el caso en que el evento no se encuentre
          document.getElementById('event-details').innerHTML = '<p>Event not found.</p>';
        }
      });
    }
  
    // Llama a displayEventDetails cuando se cargue la página
    displayEventDetails();
  });
  