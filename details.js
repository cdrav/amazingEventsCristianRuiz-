document.addEventListener('DOMContentLoaded', () => {
  // Capturar el ID del evento de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  // Buscar el evento por ID en los datos
  const event = data.events.find(event => event._id === eventId);

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
