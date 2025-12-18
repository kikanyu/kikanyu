const celebrate = document.getElementById('celebrate');
const sound = new Audio('celebrate.mp3');
function playAudio(){
  sound.currentTime = 0;
  sound.play();
  console.log('Thanks for the class!')
}
celebrate.addEventListener('click', playAudio);