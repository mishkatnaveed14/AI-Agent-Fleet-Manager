  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
 
  function openSidebar(){
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    overlay.classList.remove('opacity-0','pointer-events-none');
    document.body.style.overflow = 'hidden';
  }
 
  function closeSidebar(){
    // only actually hide the drawer below the lg breakpoint
    if (window.innerWidth < 1024) {
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('translate-x-0');
    }
    overlay.classList.add('opacity-0','pointer-events-none');
    document.body.style.overflow = '';
  }
 
  // Keep drawer state correct when resizing across the breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.add('opacity-0','pointer-events-none');
      document.body.style.overflow = '';
    } else {
      sidebar.classList.add('-translate-x-full');
    }
  });
 
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
 
  const ctx = document.getElementById('throughputChart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 220);
  gradient.addColorStop(0, 'rgba(0,240,255,0.35)');
  gradient.addColorStop(1, 'rgba(0,240,255,0.0)');
 
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        data: [1200, 1550, 1400, 1890, 1700, 2100, 2481],
        borderColor: '#00f0ff',
        backgroundColor: gradient,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#00ff66',
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } } },
        y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } } }
      }
    }
  });