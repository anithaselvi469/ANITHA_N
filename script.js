const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

const frameCount = 200;

// change extension if needed (.png / .webp)
const currentFrame = (index) =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const images = [];
const imageSeq = { frame: 1 };

// preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

images[0].onload = function () {
  render();
};

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const img = images[imageSeq.frame - 1];

  // maintain aspect ratio
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width / 2) * scale;
  const y = canvas.height / 2 - (img.height / 2) * scale;

  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  imageSeq.frame = frameIndex + 1;

  requestAnimationFrame(render);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});
