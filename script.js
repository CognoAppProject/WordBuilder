document.addEventListener('DOMContentLoaded', function () {
  const wordSlots = document.querySelectorAll('.word-slot');
  const letterContainer = document.getElementById('letter-container');
  const imageContainer = document.getElementById('image-container');
  const nextBtn = document.getElementById('next-btn');
  const toast = document.getElementById('toast');
  const instructionModal = document.getElementById('instruction-modal');
  const closeModal = document.getElementById('close-modal');

  closeModal.addEventListener('click', () => {
      instructionModal.style.display = 'none';
  });

  const levels = [
      { word: 'CAT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCXlLVWlBlxfNPkpP6mr1R0KOYFOJUvY7Mw&usqp=CAU' },
      { word: 'DOG', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3aTcYsMX3zInYZMQw7958-DWCVx7QNwmxaA&usqp=CAU' },
      { word: 'SKY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnn_XtASJ0ZR2NsLfm5jMZRS_gONH-RWdV59DReKooIDgaVgSdkKg1Ef4hur5sL7D0_BE&usqp=CAU' },
      { word: 'SUN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_6m-Mjpk8Toj9RVeegmAMUU0OFI4PzQmLZA&usqp=CAU' },
      { word: 'HAT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsu0pF4rx4HHbUdjjSaWb0GN9Zey3K3YZ8Q&usqp=CAU' },
      { word: 'CUP', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XtIIKswK4AgmKU-f9C3pWr_ZSwYohgYyzYh8IC9KkQhKJhXefOIHd1QFJBvvV7Jbc0g&usqp=CAU' }
  ];

  let currentLevel = 0;
  let draggedLetter = null;

  loadLevel();

  function loadLevel() {
      wordSlots.forEach(slot => {
          slot.textContent = '';
          slot.dataset.letter = ''; // Clear previous letters
      });

      letterContainer.innerHTML = ''; 
      imageContainer.innerHTML = `<img src="${levels[currentLevel].image}" alt="Recognition Image">`;

      const letters = levels[currentLevel].word.split('');
      shuffleArray(letters);

      letters.forEach(letter => {
          const div = document.createElement('div');
          div.textContent = letter;
          div.classList.add('letter');
          div.draggable = true;
          div.addEventListener('dragstart', dragStart);
          div.addEventListener('dragend', dragEnd);
          letterContainer.appendChild(div);
      });

      nextBtn.style.display = 'none'; // Hide Next Level button until correct answer
  }

  function checkAnswer() {
      let userWord = '';
      wordSlots.forEach(slot => {
          userWord += slot.dataset.letter || '';
      });

      if (userWord.length === levels[currentLevel].word.length) {
          if (userWord === levels[currentLevel].word) {
              showToast("Great Job! Click Next Level.");
              nextBtn.style.display = 'block'; // Show Next Level button
          } else {
              showToast("Wrong Placement! Try Again.");
              resetSlots(); // Reset slots on wrong answer
          }
      }
  }

  function resetSlots() {
      setTimeout(() => {
          wordSlots.forEach(slot => {
              slot.textContent = '';
              slot.dataset.letter = '';
          });

          document.querySelectorAll('.letter').forEach(letter => {
              letter.classList.remove('placed');
              letter.draggable = true;
          });
      }, 1000);
  }

  function dragStart(e) {
      draggedLetter = e.target;
      setTimeout(() => (e.target.style.visibility = 'hidden'), 0);
  }

  function dragEnd(e) {
      setTimeout(() => (e.target.style.visibility = 'visible'), 0);
  }

  wordSlots.forEach(slot => {
      slot.addEventListener('dragover', e => {
          e.preventDefault();
      });

      slot.addEventListener('drop', e => {
          if (!slot.textContent) {
              slot.textContent = draggedLetter.textContent;
              slot.dataset.letter = draggedLetter.textContent;
              draggedLetter.classList.add('placed');
              draggedLetter.draggable = false;
              checkAnswer();
          }
      });
  });

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  nextBtn.addEventListener('click', () => {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        loadLevel();
    } else {
        showToast("Congratulations! You completed all levels.");
        nextBtn.style.display = 'none';
    }
});

  function showToast(message) {
      toast.textContent = message;
      toast.style.display = "block";
      setTimeout(() => {
          toast.style.display = "none";
      }, 2000);
  }
});
