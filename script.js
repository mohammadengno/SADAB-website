const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlr0q6AaKnSjrpwD3tPhi13uM7PxfIv8K0EYLC6sbWJbsi_GMw9lRuWMmwJNuxfKuOCkZlRXKr9NKf/pub?output=csv';

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".cta-button, .cta-button-outline");
  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
      button.style.boxShadow = "0 0 15px #00ffccaa";
    });
    button.addEventListener("mouseleave", () => {
      button.style.boxShadow = "";
    });
  });

  // Fetch and render events
  fetch(sheetUrl)
    .then(response => response.text())
    .then(csvText => {
      const data = Papa.parse(csvText, { header: true }).data;
      const validEvents = data.filter(event => event.title && event.date);
      const eventsContainer = document.getElementById('events-list');
      let html = '<ul>';
      validEvents.forEach(event => {
        html += `<li><strong>${event.date}:</strong> ${event.title}</li>`;
      });
      html += '</ul>';
      eventsContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('حدث خطأ في تحميل الفعاليات:', error);
      document.getElementById('events-list').innerHTML = '<p>تعذر تحميل الفعاليات.</p>';
    });


  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        card.classList.toggle('flipped');
      }
    });
  });
});

