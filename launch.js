(() => {
  'use strict';
  const launchAt = Date.parse('2027-02-15T00:00:00+05:30');
  const fields = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  let timer;
  function update() {
    const remaining = Math.max(0, Math.floor((launchAt - Date.now()) / 1000));
    const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
    fields.forEach((field, i) => { field.textContent = String(values[i]).padStart(2, '0'); });
    if (remaining === 0) {
      document.getElementById('launch-message').textContent = 'The countdown is complete. A new chapter begins.';
      clearInterval(timer);
    }
  }
  document.getElementById('year').textContent = new Date().getFullYear();
  timer = setInterval(update, 1000);
  update();
})();