// ページ遷移エフェクト
const params = {
  particles: {
    number: { value: 346, density: { enable: !0, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle", stroke: { width: 0 } },
    opacity: {
      value: 1,
      random: !0,
      anim: { enable: !0, speed: 3, opacity_min: 0, sync: !1 },
    },
    size: {
      value: 2,
      random: !0,
      anim: { enable: !1, speed: 4, size_min: 0.3, sync: !1 },
    },
    line_linked: { enable: !1 },
    move: {
      enable: !0,
      speed: 120,
      direction: "none",
      random: !0,
      straight: !0,
      out_mode: "out",
      bounce: !1,
      attract: { enable: !1, rotateX: 600, rotateY: 600 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: !1 }, onclick: { enable: !1 }, resize: !0 },
  },
  retina_detect: !0,
};
window.onload = function () {
  particlesJS("left", params);
  particlesJS("right", params);
  setTimeout(function () {
    window.pJSDom[0].pJS.particles.move.enable = !1;
    window.pJSDom[1].pJS.particles.move.enable = !1;
  }, 2000);
};