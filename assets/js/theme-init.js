(function () {
  var stored = localStorage.getItem('dsynz-theme');
  var isDark = stored !== 'light';
  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
