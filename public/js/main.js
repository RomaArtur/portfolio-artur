const ICONS = {
  moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const btnText = themeToggleBtn.querySelector('.btn-text');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    enableLightMode();
  } else {
    enableDarkMode();
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLightMode = body.classList.contains('light-mode');
    if (isLightMode) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  });

  function enableLightMode() {
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    updateUI(true);
  }

  function enableDarkMode() {
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    updateUI(false);
  }

  function updateUI(isLightMode) {
    btnText.textContent = isLightMode ? 'Modo Escuro' : 'Modo Claro';
    const iconToRender = isLightMode ? ICONS.moon : ICONS.sun;
    const existingSvg = themeToggleBtn.querySelector('svg');
    if (existingSvg) existingSvg.remove();
    themeToggleBtn.insertAdjacentHTML('afterbegin', iconToRender);
  }

  fetchProfileData();

  async function fetchProfileData() {
    try {
      console.log('Iniciando busca de dados...');
      const response = await fetch('/api/profile'); 
      
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      const profile = Array.isArray(data) ? data[0] : data;

      if (profile) {
        if(profile.name) document.getElementById('name').textContent = profile.name;
        if(profile.bio) document.getElementById('bio').textContent = profile.bio;

        updateLink('linkedinUrl', profile.linkedinUrl);
        updateLink('githubUrl', profile.githubUrl);
        updateLink('whatsappUrl', profile.whatsappUrl);
        updateLink('curriculumVitaeUrl', profile.curriculumVitaeUrl);
      } else {
        console.warn('Perfil vazio ou não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      document.getElementById('bio').textContent = "Erro ao carregar dados. Verifique o console para a causa (404/Erro de Rede).";
    }
  }

  function updateLink(elementId, url) {
    const element = document.getElementById(elementId);
    if (element && url) {
      element.href = url;
    } else if (element) {
      console.log(`URL vazia para ${elementId}, escondendo botão.`);
      element.style.display = 'none'; 
    }
  }
});