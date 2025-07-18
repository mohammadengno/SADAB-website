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

// ********
const researchSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNiQ7QvXcHAu-1kMA4YCqN_DlPkOPI_ebgT0kIio2FQXWzFOfNanvSBx-U6a4BxiuZNuIEJCGV-ZJE/pub?gid=0&single=true&output=csv';

fetch(researchSheetUrl)
  .then(response => response.text())
  .then(csvText => {
    const data = Papa.parse(csvText, { header: true }).data;
    const validResearch = data.filter(item => item.title && item.link);
    const researchContainer = document.getElementById('research-list');
    let html = '<ul>';
    validResearch.forEach(item => {
      html += `<a href="${formatUrl(item.link)}" target="_blank" rel="noopener noreferrer" >${item.title}</a>`;
    });
    html += '</ul>';
    researchContainer.innerHTML = html;
  })
  .catch(error => {
    console.error('حدث خطأ في تحميل الأبحاث:', error);
    document.getElementById('research-list').innerHTML = '<p>تعذر تحميل الأبحاث.</p>';
  });
  function formatUrl(link) {
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    return 'https://' + link.trim();
  }
  return link.trim();
}
// **************************


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

  // ✅ Flip fix for iPhone
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Optional: ignore clicks on links inside the card
      if (!e.target.closest('a')) {
        card.classList.toggle('flipped');
      }
    });
  });
});

