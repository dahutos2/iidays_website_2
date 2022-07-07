TweenLite.defaultEase = Linear.easeNone;

let header     = document.querySelector("#app-header");
let bgBack     = document.querySelector("#background-back");
let bgFront    = document.querySelector("#background-front");
let toolbar    = document.querySelector("#small-toolbar");
let largeTitle = document.querySelector("#large-title");
let smallTitle = document.querySelector("#small-title");
let snsIcons   = document.querySelector("#sns-icons");

let deltaHeight = header.offsetHeight - toolbar.offsetHeight;

let rect1 = smallTitle.getBoundingClientRect();
let rect2 = largeTitle.getBoundingClientRect();

let scale = rect1.height / rect2.height;
let x = (rect1.left - rect2.left);
let y = rect1.top  - rect2.top;

let headerAnimation = new TimelineLite({ paused: true })
  .to(largeTitle, 1, { scale: scale, x: x, y: deltaHeight + y }, 0)
  .to(header,  1, { y: -deltaHeight }, 0)
  .to(toolbar, 1, { y: deltaHeight }, 0)
  .to(bgBack,  1, { y: deltaHeight / 2 }, 0)
  .to(bgFront, 1, { y: deltaHeight / 2 }, 0)
  .to(snsIcons, 1, { y: deltaHeight }, 0)
  .to(bgBack,  1, { alpha: 1 }, 0)
  .to(bgFront, 1, { alpha: 0 }, 0)
  .set(smallTitle, { alpha: 1 }, 1)
  .set(largeTitle, { alpha: 0 }, 1);

let shadowAnimation = TweenLite.to(header, 0.4, {
  boxShadow: "0 2px 5px rgba(0,0,0,0.6)",
  ease: Power1.easeOut
}).reverse();

let progress  = 0;
let requestId = null;
let reversed  = true;
update();
window.addEventListener("scroll", requestUpdate);

function requestUpdate() {
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
}

function update() {

  let scroll = window.pageYOffset;

  if (scroll < deltaHeight) {
    progress = scroll < 0 ? 0 : scroll / deltaHeight;
    reversed = true;
  } else {
    progress = 1;
    reversed = false;
  }

  headerAnimation.progress(progress);
  shadowAnimation.reversed(reversed);

  requestId = null;
}
