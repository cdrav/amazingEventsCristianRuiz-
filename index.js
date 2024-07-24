console.log("aqui se muestran todos los eventos");

const eventos = datos.eventos;

function displayEvents(eventos) {
    const container = document.getElementById("events-container");
    container.innerHTML = "";

    eventos.forEach(evento => {
        const eventosHTML = `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card">
                    <img src="${evento.imagen}" class="card-img-top" alt="${evento.nombre}">
                    <div class="card-body">
                        <h2 class="card-title">${evento.nombre}</h2>
                        <a href="details.html?id=${evento._id}" class="btn btn-primary">Detalles</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += eventosHTML;
    });
}
displayEvents(eventos);
