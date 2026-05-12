const slides = document.querySelectorAll('.slide');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startSlideshow() {
  slideInterval = setInterval(() => changeSlide(1), 6000);
}

function resetSlideshow() {
  clearInterval(slideInterval);
  startSlideshow();
}

prevSlide.addEventListener('click', () => {
  changeSlide(-1);
  resetSlideshow();
});

nextSlide.addEventListener('click', () => {
  changeSlide(1);
  resetSlideshow();
});

showSlide(currentSlide);
startSlideshow();

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

function getSavedUsers() {
  return JSON.parse(localStorage.getItem('sbsUsers') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('sbsUsers', JSON.stringify(users));
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value;
  if (!username || !password) {
    loginMessage.textContent = 'Please use a valid username and password.';
    return;
  }
  const users = getSavedUsers();
  const exists = users.some((user) => user.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    loginMessage.textContent = 'That username is already taken. Please choose another.';
    return;
  }
  users.push({ username, password });
  saveUsers(users);
  loginMessage.textContent = 'Account created successfully. You can now log in.';
  signupForm.reset();
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const users = getSavedUsers();
  const user = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase() && entry.password === password);
  if (user) {
    loginMessage.textContent = `Welcome back, ${user.username}! Your login was successful.`;
    loginForm.reset();
  } else {
    loginMessage.textContent = 'Login failed. Please check your username and password.';
  }
});
