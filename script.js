const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const unitChoices = document.querySelectorAll('[data-unit-choice]');
const unitPanels = document.querySelectorAll('[data-unit-panel]');
const unitPages = document.querySelectorAll('[data-unit-page]');
const unitContacts = document.querySelectorAll('[data-unit-contact]');
unitChoices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const selectedUnit = choice.dataset.unitChoice;
    unitChoices.forEach((item) => {
      const isSelected = item === choice;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });
    unitPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.unitPanel === selectedUnit);
    });
    unitPages.forEach((page) => {
      const isSelected = page.dataset.unitPage === selectedUnit;
      page.classList.toggle('is-active', isSelected);
      if (isSelected) page.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
    });
    unitContacts.forEach((contact) => {
      contact.classList.toggle('is-active', contact.dataset.unitContact === selectedUnit);
    });
    const destination = document.querySelector(selectedUnit === 'ultra' ? '#sobre' : '#unidade-desconto');
    destination?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const galleryModal = document.querySelector('#gallery-modal');
const modalImage = document.querySelector('#modal-image');
const modalCaption = document.querySelector('#modal-caption');

document.querySelectorAll('[data-gallery]').forEach((tile) => {
  tile.addEventListener('click', () => {
    modalImage.src = tile.dataset.gallery;
    modalImage.alt = tile.dataset.caption || '';
    modalCaption.textContent = tile.dataset.caption || '';
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
  });
});

const privacyModal = document.querySelector('#privacy-modal');
document.querySelector('[data-privacy]')?.addEventListener('click', () => {
  privacyModal.classList.add('is-open');
  privacyModal.setAttribute('aria-hidden', 'false');
});

document.querySelectorAll('[data-close-modal]').forEach((closer) => {
  closer.addEventListener('click', () => {
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
