let correctQuestions = JSON.parse(document.getElementById('correct-questions').innerHTML);
document.getElementById('correct-questions').remove();

for (const question of correctQuestions) {
  let questionDiv = document.getElementById(`q${question}`);

  if (questionDiv.getAttribute('type') === 'fill') {
    let inputs = questionDiv.getElementsByTagName('input');
    for (let input of inputs) {
      input.classList.add('correct');
      input.disabled = true;
    }
  }

  let checkButton = questionDiv.getElementsByTagName('button')[0];
  checkButton.disabled = true;
}

function checkFill() {
  let correct = true;
  for (const input of event.path[1].getElementsByTagName('input')) {
    if (input.value === input.placeholder) {
      input.classList.add('correct');
      input.classList.remove('incorrect');
      input.disabled = true;
    } else {
      input.classList.add('incorrect');
      input.classList.remove('correct');
      correct = false;
    }
  }
  if (correct) {
    event.target.disabled = true;
    correctQuestions.push(Number(event.path[1].getAttribute('number')));
  }
}

function updateProgress() {
  axios.post(window.location.href.split('/')[4], {
    correctQuestions,
  }).then(res => {
    window.location.replace("http://localhost:5000/learn");
  }).catch(err => {})
}