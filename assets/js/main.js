/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId, headerId, mainId) => {
  const toggle = document.getElementById(toggleId),
    sidebar = document.getElementById(sidebarId),
    header = document.getElementById(headerId),
    main = document.getElementById(mainId)

  if (toggle && sidebar && header && main) {
    toggle.addEventListener('click', () => {
      /* Show sidebar */
      sidebar.classList.toggle('show-sidebar')
      /* Add padding header */
      header.classList.toggle('left-pd')
      /* Add padding main */
      main.classList.toggle('left-pd')
    })
  }
}
showSidebar('header-toggle', 'sidebar', 'header', 'main')

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll('.sidebar__list a')

function linkColor() {
  sidebarLink.forEach(l => l.classList.remove('active-link'))
  this.classList.add('active-link')
}

sidebarLink.forEach(l => l.addEventListener('click', linkColor))

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-clear-fill' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})
const scrollbar = document.getElementById('myScrollbar');
const scrollbarThumb = document.getElementById('scrollbarThumb');
const qiyshayganDiv = document.querySelector('.qiyshaygan-div');

let isDragging = false;
let startY = 0;

scrollbarThumb.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY - scrollbarThumb.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  e.preventDefault();

  const y = e.clientY - startY;
  const scrollbarHeight = scrollbar.offsetHeight;
  const thumbHeight = scrollbarThumb.offsetHeight;
  const maxScroll = scrollbarHeight - thumbHeight;

  const scrollPercent = y / maxScroll;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const maxWindowScroll = documentHeight - windowHeight;

  // Sahifa va divni scroll qilish (teskari tomonga)
  window.scrollTo(0, (1 - scrollPercent) * maxWindowScroll);
  qiyshayganDiv.scrollTo((1 - scrollPercent) * (qiyshayganDiv.scrollWidth - qiyshayganDiv.clientWidth), 0);

  // Tugmaning pozitsiyasini yangilang
  scrollbarThumb.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('scroll', () => {
  // Sahifa scroll qilinganda tugmaning pozitsiyasini yangilang
  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  const scrollbarHeight = scrollbar.offsetHeight;
  const thumbHeight = scrollbarThumb.offsetHeight;
  const maxScroll = scrollbarHeight - thumbHeight;
  scrollbarThumb.style.top = `${(1 - scrollPercent) * maxScroll}px`;

  // Divni ham scroll qilish (teskari tomonga)
  qiyshayganDiv.scrollTo((1 - scrollPercent) * (qiyshayganDiv.scrollWidth - qiyshayganDiv.clientWidth), 0);
});
const scriptURL = "https://script.google.com/macros/s/AKfycbzpqkGmOivLHBM-0SOxu-2zpkQ8NRet2cl-LXAMwdXuv_poe9NFlorZzLU_7E1p2VFr/exec";
const form = document.forms["submit-to-google-sheet"];
const submitButton = document.querySelector('input[type="submit"]'); // Submit tugmasini tanlash

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Submit tugmasini o'chirib qo'yish
  submitButton.disabled = true;
  submitButton.style.cursor = "not-allowed";

  const formData = new FormData(form);

  fetch(scriptURL, { method: "POST", body: formData })
    .then(response => {
      swal("Done", "Submitted Successfully.", "success");
      form.reset();
    })
    .catch(error => {
      swal("Error", "Something went wrong. Please try again!", "error");
      console.error("Error:", error);
    })
    .finally(() => {
      // Submit tugmasini qayta yoqish
      submitButton.disabled = false;
      submitButton.style.cursor = "pointer";
    });
});