document.addEventListener('DOMContentLoaded', function () {
  const scoreLabel = document.querySelector('#score');

  const choicesButtons = Array.from(document.querySelectorAll('.choice'));

  const CHOICES = [
    {
      name: 'rock',
      beats: 'scissors',
    },
    {
      name: 'paper',
      beats: 'rock',
    },
    {
      name: 'scissors',
      beats: 'paper',
    },
  ];

  let scoreValue = Number(localStorage.getItem('score') || 0);
  scoreLabel.textContent = scoreValue;

  function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)].name;
  }

  function updateResult(score) {
    scoreValue += score;
    scoreLabel.textContent = scoreValue;
    localStorage.setItem('score', scoreValue);
  }

  function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return 'draw';
    }

    const choice = CHOICES.find((c) => c.name === playerChoice);

    if (choice.beats === computerChoice) {
      updateResult(1);
      return 'win';
    }

    updateResult(-1);
    return 'lose';
  }

  choicesButtons.forEach((button) => {
    button.addEventListener(
      'click',
      () => {
        const computerChoice = getComputerChoice();
        const playerChoice = button.dataset.choice;
        getWinner(playerChoice, computerChoice);
      },
      {}
    );
  });
});
