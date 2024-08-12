// details.js

function getEventIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('eventId');
  }
  
  function displayEventDetails(eventId) {
    // Buscar el evento en la data
    const event = data.events.find(e => e._id === eventId);
  
    if (event) {
      const eventDetails = document.getElementById('event-details');
      eventDetails.innerHTML = `
        <div class="card">
          <img src="${event.image}" class="card-img-top" alt="${event.name}">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
          </div>
        </div>
      `;
    } else {
      // Manejar el caso en que no se encuentra el evento
      document.getElementById('event-details').innerHTML = '<p>Evento no encontrado.</p>';
    }
  }
  
  const eventId = getEventIdFromURL();
  displayEventDetails(eventId);
  