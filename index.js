document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxesContainer = document.querySelector('.col-12.text-center.mb-4');
    const eventsContainer = document.getElementById('events-container');
    const searchInput = document.getElementById('search-input');

    // URL de la API
    const apiUrl = 'https://aulamindhub.github.io/amazing-api/events.json';

    // Función para obtener eventos de la API
    async function fetchEvents() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.events; // Devuelve los eventos de la API
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    // Función para extraer categorías únicas
    function getUniqueCategories(events) {
        const categories = events.map(event => event.category);
        return [...new Set(categories)];
    }

    // Función para mostrar categorías como checkboxes
    function displayCategoryCheckboxes(categories) {
        categoryCheckboxesContainer.innerHTML = ''; // Limpiar contenedor de categorías
        categories.forEach(category => {
            const categoryHTML = `
                <label><input type="checkbox" value="${category}"> ${category}</label>
            `;
            categoryCheckboxesContainer.innerHTML += categoryHTML;
        });
        // Agregar el campo de búsqueda
        categoryCheckboxesContainer.innerHTML += '<input type="search" id="search-input" class="form-control d-inline-block w-auto mt-2" placeholder="Buscar">';
    }

    // Función para mostrar eventos en la página
    function displayEvents(events) {
        eventsContainer.innerHTML = '';
        events.forEach(event => {
            const eventHTML = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card">
                        <img src="${event.image}" class="card-img-top" alt="${event.name}">
                        <div class="card-body">
                            <h2 class="card-title">${event.name}</h2>
                            <p class="card-text">${event.description}</p>
                            <p class="card-text"><strong>Price:</strong> $${event.price}</p>
                            <a href="details.html?id=${event._id}" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
            `;
            eventsContainer.innerHTML += eventHTML;
        });
    }

    // Función para filtrar eventos según los checkboxes y el campo de búsqueda
    function filterEvents(events) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        const filteredEvents = events.filter(event => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
            const matchesSearch = event.name.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<p>No events found.</p>';
        } else {
            displayEvents(filteredEvents);
        }
    }

    // Función para manejar la carga de eventos y la inicialización de filtros
    async function initializePage() {
        const events = await fetchEvents();
        const uniqueCategories = getUniqueCategories(events);
        displayCategoryCheckboxes(uniqueCategories);
        displayEvents(events);

        // Event listeners para el filtrado de eventos
        document.addEventListener('change', () => filterEvents(events));
        searchInput.addEventListener('input', () => filterEvents(events));
    }

    initializePage();
});
