document.addEventListener('DOMContentLoaded', async () => {
    const categoryCheckboxesContainer = document.querySelector('.col-12.text-center.mb-4');
    const eventsContainer = document.getElementById('events-container');

    // URL de la API
    const apiUrl = 'https://aulamindhub.github.io/amazing-api/events.json';

    // Función para obtener eventos de la API
    async function fetchEvents() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data; // Devuelve el objeto completo que contiene eventos y fecha actual
        } catch (error) {
            console.error('Error fetching events:', error);
            return { events: [], currentDate: new Date() }; // Devuelve un objeto vacío en caso de error
        }
    }

    // Función para generar checkboxes de categorías
    function generateCategoryCheckboxes(categories) {
        categoryCheckboxesContainer.innerHTML = '';

        categories.forEach(category => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${category}"> ${category}`;
            categoryCheckboxesContainer.appendChild(label);
        });

        // Agregar el campo de búsqueda
        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.id = 'search-input';
        searchInput.className = 'form-control d-inline-block w-auto mt-2';
        searchInput.placeholder = 'Buscar';
        categoryCheckboxesContainer.appendChild(searchInput);
    }

    // Función para filtrar y mostrar eventos pasados
    function filterAndDisplayEvents(events, currentDate) {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const selectedCategories = Array.from(document.querySelectorAll('.col-12.text-center.mb-4 input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
            const matchesSearch = event.name.toLowerCase().includes(searchTerm);
            return eventDate < currentDate && matchesCategory && matchesSearch;
        });

        eventsContainer.innerHTML = '';

        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<p>No past events found.</p>';
        } else {
            filteredEvents.forEach(event => {
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
    }

    // Inicializa la página
    async function initializePage() {
        const data = await fetchEvents();
        const events = data.events;
        const currentDate = new Date(data.currentDate);

        // Obtener y mostrar categorías únicas
        const categories = [...new Set(events.map(event => event.category))];
        generateCategoryCheckboxes(categories);

        // Mostrar eventos pasados
        filterAndDisplayEvents(events, currentDate);

        // Agregar event listeners para filtros
        document.querySelectorAll('.col-12.text-center.mb-4 input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => filterAndDisplayEvents(events, currentDate));
        });

        document.getElementById('search-input').addEventListener('input', () => filterAndDisplayEvents(events, currentDate));
    }

    initializePage();
});
