const input = document.getElementById('input');
const next = document.getElementById('nextpage');
const canvas = document.getElementById('pdf');
const context = canvas.getContext('2d');
const container3 = document.getElementById('cont3');
var scale = 1.5;

let pdf = null;

async function renderRandomPage() {
  if(!pdf) return;

  const randomPageNumber = Math.floor(Math.random() * pdf.numPages) + 1;
  const page = await pdf.getPage(randomPageNumber);
  const viewport = page.getViewport({ scale });

  canvas.width = viewport.width;
  canvas.height = viewport.height;
  container3.style.height = `${viewport.height + 509}px`;
  canvas.style.backgroundColor = "white";

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
}

  input.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if(!file || file.type !== 'application/pdf') return;
    const fileReader = new FileReader();

    fileReader.onload = async function() {
      const array = new Uint8Array(this.result);
      pdf = await pdfjsLib.getDocument({ data: array }).promise;
      await renderRandomPage();
      next.disabled = false;
    };

    fileReader.readAsArrayBuffer(file);
});

  next.addEventListener('click', renderRandomPage);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
  	 event.preventDefault();
      next.click();
  }

});
  const mediaQuery = window.matchMedia('(max-width: 800px)');
  handleScreenChange(mediaQuery);
  mediaQuery.addEventListener('change', handleScreenChange);


  function handleScreenChange(event) {
  if (event.matches) {
    next.textContent = 'Next Slide';
    scale = 0.8;
  } else {
    next.textContent = 'Next Slide (Spacebar)';
  }
};

var clipper = document.querySelector(".clipper");
var slider = document.getElementById("croprange");
var cropVal = document.getElementById("cropval");

slider.addEventListener('input', function() {
  clipper.style.width = viewport.width * 1.5;
  clipper.style.height = viewport.height * 1.5;
  clipper.style.clipPath = `inset(${(100 - this.value)}% 0% 0% 0%)`;
  cropVal.innerHTML = this.value;
});

console.log(scale);
