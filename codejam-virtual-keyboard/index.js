import ru from './src/languages/ru-RU.js';
import en from './src/languages/en-EN.js';

const symbolLayout = [];
const [lowerCase, upperCase] = [0, 1];
const pressedKeys = new Set();
const langs = { ru, en };
const currentLang = localStorage.getItem('keyboardLang') || 'ru';
const exceptions = new Set();

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.prepend(wrapper);

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
textarea.id = 'text';
textarea.setAttribute('rows', 10);
wrapper.prepend(textarea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
wrapper.append(keyboard);

const field = document.createElement('div');
field.classList.add('keyboard__field');
keyboard.append(field);

const setSymbols = (lang, pos) => {
  symbolLayout.forEach((code) => {
    const key = document.querySelector(`.${code}`);
    key.innerHTML = `<span>${lang[code][pos]}</span>`;
  });
};

const setInitialConfig = (lang) => {
  const keyCodes = Object.keys(lang);

  keyCodes.forEach((keyCode) => {
    const key = document.createElement('div');
    key.classList.add('key');
    key.classList.add(keyCode);
    symbolLayout.push(keyCode);

    if (keyCode === 'Backspace') {
      key.style.width = `${107}px`;
    } else if (keyCode === 'Tab') {
      key.style.width = `${55}px`;
      key.style.margin = '0';
    } else if (keyCode === 'CapsLock') {
      key.setAttribute('id', 'capslock');
      key.style.width = `${87}px`;
      key.style.margin = '0';
    } else if (keyCode === 'Enter') {
      key.style.width = `${117}px`;
    } else if (keyCode === 'ShiftLeft') {
      key.style.width = `${107}px`;
      key.style.margin = '0';
    } else if (keyCode === 'ShiftRight') {
      key.style.width = `${97}px`;
    } else if (keyCode === 'Space') {
      key.style.width = `${352}px`;
    } else if (keyCode === 'ControlLeft') {
      key.style.width = `${60}px`;
      key.style.margin = '0';
    } else if (keyCode === 'ControlRight') {
      key.style.width = `${45}px`;
    }

    document.querySelector('.keyboard__field').append(key);
  });

  setSymbols(lang, lowerCase);
};

keyboard.classList.add(currentLang);
setInitialConfig(langs[currentLang]);

const setLang = (e) => {
  pressedKeys.add(e.code);

  const changeLang = (previous, set) => {
    keyboard.classList.remove(previous);
    keyboard.classList.add(set);
  };

  if (pressedKeys.has('ControlLeft') && pressedKeys.has('AltLeft')) {
    if (keyboard.classList.contains('ru') && !keyboard.classList.contains('capslock-active')) {
      changeLang('ru', 'en');
      setSymbols(en, lowerCase);
    } else if (keyboard.classList.contains('ru') && keyboard.classList.contains('capslock-active')) {
      changeLang('ru', 'en');
      setSymbols(en, upperCase);
    } else if (keyboard.classList.contains('en') && !keyboard.classList.contains('capslock-active')) {
      changeLang('en', 'ru');
      setSymbols(ru, lowerCase);
    } else {
      changeLang('en', 'ru');
      setSymbols(ru, upperCase);
    }
  }
};

const setAnimation = (e) => {
  try {
    if (e.code === 'F5') return;
    document.querySelector(`.${e.code}`).style.backgroundColor = 'rgb(53, 124, 78)';
    if (e.code === 'Space') {
      document.querySelector(`.${e.code}`).style.transform = 'rotate(1.5deg)';
    } else {
      document.querySelector(`.${e.code}`).style.transform = 'rotate(3deg)';
    }
  } catch (err) {
    if (err.name === 'TypeError') exceptions.add(err);
  }
};