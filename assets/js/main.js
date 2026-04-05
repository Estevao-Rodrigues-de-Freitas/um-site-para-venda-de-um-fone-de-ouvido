class FramePlayer {
  constructor(options) {
    this.canvas = document.getElementById(options.canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.path = options.path;     
    this.frameCount = options.frameCount;
    this.ext = options.ext || "png";
    this.pad = options.pad || 4;

    this.images = [];
    this.loaded = 0;
    this.currentIndex = 0;

    this.preload();
  }


  framePath(i) {
    return `${this.path}${String(i + 1).padStart(this.pad, "0")}.${this.ext}`;
  }

  preload() {
    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.src = this.framePath(i);
      img.onload = () => {
        this.loaded++;

        if (this.loaded === this.frameCount) {
          this.render(this.currentIndex);
        }
      };
      this.images.push(img);
    }
  }

  render(index) {
    const img = this.images[index];
    if (!img) return;

    this.canvas.width = img.width;
    this.canvas.height = img.height;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(img, 0, 0);
  }

  // Navegação
  nextFrame() {
    this.currentIndex = (this.currentIndex + 1) % this.frameCount;
    this.render(this.currentIndex);
  }

  prevFrame() {
    this.currentIndex = (this.currentIndex - 1 + this.frameCount) % this.frameCount;
    this.render(this.currentIndex);
  }
}

const player1 = new FramePlayer({
  canvasId: "canvas1",
  path: "assets/images/framesVolume/three_",
  frameCount: 9,
  ext: "png",
  pad: 4
});

const player2 = new FramePlayer({
  canvasId: "canvas2",
  path: "assets/images/framesOnOff/five_",
  frameCount: 2,
  ext: "png",
  pad: 4
});

