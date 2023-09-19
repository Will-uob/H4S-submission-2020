const questionCount = [1, 2, 3, 5, 5, 5];
const progress = JSON.parse(document.getElementById('progress').innerHTML);

document.getElementById('progress').remove();

const moduleElements = document.getElementById('modules-container').children;

for (let i = 0; i < moduleElements.length; i++) {
  let progressNumber = moduleElements[i].getElementsByClassName('progress')[0];
  let progressBar = moduleElements[i].getElementsByClassName('progress-bar')[0];

  let completion = Math.round(progress[i] / questionCount[i] * 100) || 0;
  progressNumber.innerHTML = progressBar.style.width = `${completion}%`;
}