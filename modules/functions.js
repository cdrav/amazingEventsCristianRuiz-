document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxesContainer = document.querySelector('.col-12.text-center.mb-4');
    const eventsContainer = document.getElementById('events-container');

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

    // Función para mostrar los eventos
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

    // Función para filtrar los eventos
    function filterEvents(events) {
        const searchInput = document.getElementById('search-input');
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

    // Función para obtener los datos de la API
    function fetchData() {
        fetch('https://aulamindhub.github.io/amazing-api/events.json')
            .then(response => response.json())
            .then(data => {
                const events = data.events; // Obtener los eventos del JSON
                const uniqueCategories = getUniqueCategories(events);
                displayCategoryCheckboxes(uniqueCategories);

                // Filtrar y mostrar eventos cuando se hagan cambios en los checkboxes o en el campo de búsqueda
                const searchInput = document.getElementById('search-input');
                searchInput.addEventListener('input', () => filterEvents(events));
                categoryCheckboxesContainer.addEventListener('change', () => filterEvents(events));

                // Mostrar todos los eventos inicialmente
                displayEvents(events);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    // Llamar a la función fetchData para obtener los eventos desde la API
    fetchData();
});
