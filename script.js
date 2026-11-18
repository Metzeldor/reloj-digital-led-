const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const colonEl = document.getElementById('colon');
const dateEl = document.getElementById('date-display');
const ampmEl = document.getElementById('ampm-display');
const daysSpans = document.querySelectorAll('#days-bar span');

const formatBtn = document.getElementById('toggle-format');
const colorBtn = document.getElementById('change-color');

let is24Hour = true;

// Paleta de colores LED disponibles
const ledThemes = [
  { color: '#00f3ff', glow: 'rgba(0, 243, 255, 0.55)' }, // Cian neón
  { color: '#00ff66', glow: 'rgba(0, 255, 102, 0.55)' }, // Verde matriz
  { color: '#ff2a5f', glow: 'rgba(255, 42, 95, 0.55)' },  // Rojo clásico
  { color: '#ffae00', glow: 'rgba(255, 174, 0, 0.55)' }   // Ámbar retro
];
let currentThemeIndex = 0;

function padZero(num) {
  return String(num).padStart(2, '0');
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Formato 12h o 24h
  if (!is24Hour) {
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    ampmEl.textContent = period;
  } else {
    ampmEl.textContent = '24H';
  }

  hoursEl.textContent = padZero(hours);
  minutesEl.textContent = padZero(minutes);
  secondsEl.textContent = padZero(seconds);

  // Parpadeo de los dos puntos cada segundo
  colonEl.classList.toggle('dim', seconds % 2 !== 0);

  // Actualizar fecha
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('es-ES', options).toUpperCase();

  // Iluminar día de la semana activo
  const currentDay = now.getDay();
  daysSpans.forEach(span => {
    span.classList.toggle('active', Number(span.dataset.day) === currentDay);
  });
}

// Cambiar formato 12H / 24H
formatBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  updateClock();
});

// Cambiar color de los LEDs
colorBtn.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % ledThemes.length;
  const theme = ledThemes[currentThemeIndex];
  document.documentElement.style.setProperty('--led-color', theme.color);
  document.documentElement.style.setProperty('--led-glow', theme.glow);
});

// Iniciar inmediatamente y actualizar cada segundo
updateClock();
setInterval(updateClock, 1000);