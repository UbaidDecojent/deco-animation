var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {
  updateScroller();
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll);
}

function updateScroller() {

  var resized = scroller.resizeRequest > 0;

  if (resized) {
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }

  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }

  TweenLite.set(scroller.target, {
    y: -scroller.y
  });

  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

if (window.innerWidth < 911) {

} else {
  gsap.set(".header", { scale: 0.9 });
  gsap.timeline().from(".header", { duration: 0.4, opacity: 0 })
    .from(".title", { opacity: 0, scale: 0, ease: "back" });

  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".img1", {
    scrollTrigger: {
      trigger: ".img1",
      start: "top center",
      end: "top 180px",
      scrub: 1,
      onEnter: () => gsap.to('body', {backgroundColor:'black'}), 
      onLeave: () => gsap.to('body', {backgroundColor:'black'}),
      onLeaveBack: () => gsap.to('body', {backgroundColor:'white'}), 
      onEnterBack: () => gsap.to('body', {backgroundColor:'white'}),
    },
    xPercent: -130,
    yPercent: -50,
    ease: "rough",
    duration: 10,
  });
  gsap.from(".img2", {
    scrollTrigger: {
      trigger: ".img2",
      start: "top center",
      end: "top 180px",
      scrub: 1,
    },
    xPercent: 130,
    yPercent: -50,
    ease: "rough",
    duration: 10,
  });
}


// var SCROLLTRIGGER = ScrollTrigger;
// gsap.registerPlugin(ScrollTrigger);
// var content = $(".content"),
//     content_img_1 = $(".img1")
//     content_img_2 = $(".img2");

// var content_img_animation_timeline = gsap.timeline();

// content_img_animation_timeline.fromTo(content_img_1,{xPercent:-130,yPercent:-50},{duration:1});

// SCROLLTRIGGER.create({
//     trigger: content,
//     animation: content_img_1,
//     start: "top center",
//     end: "top 180px",
//     scrub:1
// });
