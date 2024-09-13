function fetchEvents() {
    return fetch('https://aulamindhub.github.io/amazing-api/events.json')
      .then(response => response.json())
      .then(data => data.events)
      .catch(error => {
        console.error('Error fetching events data:', error);
        return [];
      });
  }
  
  function getHighestAssistanceEvent(events) {
    return events.reduce((prev, current) => 
      (prev.assistancePercentage > (current.assistancePercentage || 0) ? prev : current), 
      events[0] || {}
    );
  }
  
  function getLowestAssistanceEvent(events) {
    return events.reduce((prev, current) => 
      (prev.assistancePercentage < (current.assistancePercentage || 0) ? prev : current), 
      events[0] || {}
    );
  }
  
  function getLargestCapacityEvent(events) {
    return events.reduce((prev, current) => 
      (prev.capacity > (current.capacity || 0) ? prev : current), 
      events[0] || {}
    );
  }
  
  function getRevenuesAndAssistanceByCategory(events) {
    const categoryStats = {};
  
    events.forEach(event => {
      if (!categoryStats[event.category]) {
        categoryStats[event.category] = { revenue: 0, assistance: 0, count: 0 };
      }
      categoryStats[event.category].revenue += (event.price || 0) * (event.assistance || 0);
      categoryStats[event.category].assistance += (event.assistance || 0);
      categoryStats[event.category].count += 1;
    });
  
    return Object.keys(categoryStats).map(category => {
      const stats = categoryStats[category];
      return {
        category,
        revenue: stats.revenue,
        assistancePercentage: (stats.assistance / (stats.count * 100)) * 100 || 0,
      };
    });
  }
  
  function displayStatistics() {
    fetchEvents().then(events => {
      // Tabla de estadísticas de eventos pasados
      const pastEventsTable = document.getElementById('past-events-stats');
      const highestAssistance = getHighestAssistanceEvent(events);
      const lowestAssistance = getLowestAssistanceEvent(events);
      const largestCapacity = getLargestCapacityEvent(events);
  
      pastEventsTable.innerHTML = `
        <tr>
          <td>${highestAssistance.name || 'N/A'} (${(highestAssistance.assistancePercentage || 0).toFixed(2)}%)</td>
          <td>${lowestAssistance.name || 'N/A'} (${(lowestAssistance.assistancePercentage || 0).toFixed(2)}%)</td>
          <td>${largestCapacity.name || 'N/A'} (${(largestCapacity.capacity || 0)})</td>
        </tr>
      `;
  
      // Tabla de estadísticas de eventos futuros por categoría
      const upcomingEvents = events.filter(event => new Date(event.date) > new Date()); // Filtrar eventos futuros
      const upcomingEventsTable = document.getElementById('upcoming-events-stats');
      const upcomingCategoryStats = getRevenuesAndAssistanceByCategory(upcomingEvents);
      
      upcomingEventsTable.innerHTML = upcomingCategoryStats.map(stats => `
        <tr>
          <td>${stats.category || 'N/A'}</td>
          <td>$${(stats.revenue || 0).toFixed(2)}</td>
          <td>${(stats.assistancePercentage || 0).toFixed(2)}%</td>
        </tr>
      `).join('');
  
      // Tabla de estadísticas de eventos pasados por categoría
      const pastEvents = events.filter(event => new Date(event.date) <= new Date()); // Filtrar eventos pasados
      const pastEventsByCategoryTable = document.getElementById('past-events-by-category');
      const pastCategoryStats = getRevenuesAndAssistanceByCategory(pastEvents);
      
      pastEventsByCategoryTable.innerHTML = pastCategoryStats.map(stats => `
        <tr>
          <td>${stats.category || 'N/A'}</td>
          <td>$${(stats.revenue || 0).toFixed(2)}</td>
          <td>${(stats.assistancePercentage || 0).toFixed(2)}%</td>
        </tr>
      `).join('');
    });
  }
  
  // Llamar a la función cuando la página haya cargado
  window.onload = displayStatistics;
  