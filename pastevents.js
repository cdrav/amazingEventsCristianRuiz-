const events = data.events;
const currentDate = new Date(data.currentDate);

// Obtener todas las categorías únicas de los eventos
const categories = [...new Set(events.map(event => event.category))];

// Generar dinámicamente los checkboxes de categorías
function generateCategoryCheckboxes() {
    const categoryContainer = document.querySelector('.col-12.text-center.mb-4');
    categoryContainer.innerHTML = '';

    categories.forEach(category => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${category}"> ${category}`;
        categoryContainer.appendChild(label);
    });

    // Agregar el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'search-input';
    searchInput.className = 'form-control d-inline-block w-auto mt-2';
    searchInput.placeholder = 'Buscar';
    categoryContainer.appendChild(searchInput);
}

// Filtrar y mostrar eventos pasados
function filterAndDisplayEvents() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.col-12.text-center.mb-4 input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const matchesSearch = event.name.toLowerCase().includes(searchTerm);
        return eventDate < currentDate && matchesCategory && matchesSearch;
    });

    const container = document.getElementById('events-container');
    container.innerHTML = '';

    if (filteredEvents.length === 0) {
        container.innerHTML = '<p>No past events found.</p>';
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
            container.innerHTML += eventHTML;
        });
    }
}

// Event Listeners para filtros
document.addEventListener('DOMContentLoaded', () => {
    generateCategoryCheckboxes();
    filterAndDisplayEvents();

    document.querySelectorAll('.col-12.text-center.mb-4 input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplayEvents);
    });

    document.getElementById('search-input').addEventListener('input', filterAndDisplayEvents);
});
