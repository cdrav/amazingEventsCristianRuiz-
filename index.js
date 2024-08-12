document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxesContainer = document.querySelector('.col-12.text-center.mb-4');
    const eventsContainer = document.getElementById('events-container');
    const events = data.events; 

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

    // Mostrar categorías al cargar la página
    const uniqueCategories = getUniqueCategories(events);
    displayCategoryCheckboxes(uniqueCategories);

    // Reasignar searchInput después de generar dinámicamente los elementos
    const searchInput = document.getElementById('search-input');
    
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

    function filterEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]'))
            .filter(checkbox => checkbox.checked)
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

    // Listeners
    searchInput.addEventListener('input', filterEvents);
    categoryCheckboxesContainer.addEventListener('change', filterEvents);

    // Initial display
    displayEvents(events);
});
