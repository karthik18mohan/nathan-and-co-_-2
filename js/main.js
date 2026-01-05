const locationSelect = document.querySelector('[data-location-select]');
const addressCards = document.querySelectorAll('[data-location-card]');

if (locationSelect && addressCards.length > 0) {
  locationSelect.addEventListener('change', () => {
    const selected = locationSelect.value;
    addressCards.forEach((card) => {
      card.classList.remove('highlight');
    });

    if (!selected || selected === 'no-preference') {
      return;
    }

    const activeCard = document.querySelector(`[data-location-card="${selected}"]`);
    if (activeCard) {
      activeCard.classList.add('highlight');
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

const newsroomContainer = document.querySelector('[data-newsroom-list]');
const paginationContainer = document.querySelector('[data-pagination]');

if (newsroomContainer && paginationContainer) {
  const newsroomData = [
    { title: 'A Peep into the IBC Amendment Bill, 2025', date: 'March 2023' },
    { title: 'Brief Overview of SSAE 3000', date: 'February 2023' },
    { title: 'NFRA - Demonstrated Commitment to Compliance Excellence', date: 'January 2023' },
    { title: 'Global Minimum Tax and India Inc', date: 'December 2022' },
    { title: 'Corporate Governance Review Highlights', date: 'November 2022' },
    { title: 'ESG Reporting Frameworks Update', date: 'October 2022' },
    { title: 'IFRS Convergence: Key Impacts', date: 'September 2022' },
    { title: 'Tax Litigation Trends in 2022', date: 'August 2022' },
    { title: 'Audit Quality Indicators Update', date: 'July 2022' },
    { title: 'Digital Transformation for Finance Teams', date: 'June 2022' },
    { title: 'RBI Compliance Bulletin', date: 'May 2022' },
    { title: 'Transfer Pricing Year in Review', date: 'April 2022' },
    { title: 'Risk Advisory Digest', date: 'March 2022' },
    { title: 'Data Privacy and Governance Overview', date: 'February 2022' },
    { title: 'Forensic Readiness Checklist', date: 'January 2022' },
    { title: 'Quarterly GST Update', date: 'December 2021' },
    { title: 'Chartered Accountant Digest', date: 'November 2021' },
    { title: 'Financial Reporting Insights', date: 'October 2021' },
    { title: 'Regulatory Compliance Tracker', date: 'September 2021' },
    { title: 'Economic Outlook Briefing', date: 'August 2021' }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(newsroomData.length / itemsPerPage);

  const renderPage = (page) => {
    newsroomContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    newsroomData.slice(start, end).forEach((item) => {
      const row = document.createElement('div');
      row.className = 'newsroom-item';
      row.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h3 class="h5 mb-1">${item.title}</h3>
            <small class="text-muted">${item.date}</small>
          </div>
          <a class="btn btn-primary" href="#">Download now</a>
        </div>
      `;
      newsroomContainer.appendChild(row);
    });
  };

  const renderPagination = (currentPage) => {
    paginationContainer.innerHTML = '';

    const prev = document.createElement('button');
    prev.className = 'btn btn-link';
    prev.textContent = 'Prev';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', () => {
      renderPage(currentPage - 1);
      renderPagination(currentPage - 1);
    });
    paginationContainer.appendChild(prev);

    for (let i = 1; i <= totalPages; i += 1) {
      const pageButton = document.createElement('button');
      pageButton.className = `btn btn-link${i === currentPage ? ' fw-bold text-decoration-underline' : ''}`;
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        renderPage(i);
        renderPagination(i);
      });
      paginationContainer.appendChild(pageButton);
    }

    const next = document.createElement('button');
    next.className = 'btn btn-link';
    next.textContent = 'Next';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', () => {
      renderPage(currentPage + 1);
      renderPagination(currentPage + 1);
    });
    paginationContainer.appendChild(next);
  };

  renderPage(1);
  renderPagination(1);
}
