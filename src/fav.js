const hearts = document.getElementsByClassName("heart");
for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i];
    heart.addEventListener('click', (event) => {
      event.target.classList.toggle('is-active');
    });
  }