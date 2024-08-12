console.log("Hello, here are all the events displayed");

const events = data.events;

function displayEvents(events) {
    const container = document.getElementById("events-container");
    container.innerHTML = "";

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
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
    }
}

displayEvents(events);
