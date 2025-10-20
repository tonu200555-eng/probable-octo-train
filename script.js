gsap.registerPlugin(ScrollTrigger, CustomEase, ScrambleTextPlugin);

document.addEventListener("DOMContentLoaded", () => {

  // Smooth scrolling setup
  const lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 0.72,
    smoothTouch: false,
  });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Custom easing identical to original
  const easeCustom = CustomEase.create("custom", "M0,0 C0.7,0.024 0.199,0.976 1,1");

  // Hero intro sequence
  const tl = gsap.timeline({ defaults: { ease: easeCustom }});

  tl.from("[herowrap]", {
      yPercent: 105,
      rotateZ: 20,
      duration: 1.3,
      delay: 0.2
    })
    .to("[hero-char]", {
      yPercent: 0,
      rotateZ: 0,
      opacity: 1,
      stagger: 0.09,
      duration: 1
    }, "-=0.8")
    .to("[hero-char2]", {
      yPercent: 0,
      rotateZ: 0,
      opacity: 1,
      stagger: 0.09,
      duration: 1.4
    }, "-=0.9")
    .to("[hero-num]", {
      yPercent: 0,
      rotateZ: 0,
      opacity: 1,
      stagger: 0.07,
      duration: 1.2
    }, "-=1.1")

    // ScrambleText reveal lines
    .to("[heroabout]", {
      opacity:1,
      duration:1,
      delay:0.2,
      scrambleText:{
        text:"A tribute to the engineering, design,",
        chars:" ",
        speed:0.6,
        tweenLength:false
      }
    }, "+=0.1")
    .to("[heroabout2]", {
      opacity:1,
      duration:1,
      delay:0.6,
      scrambleText:{
        text:"and culture of Honda’s iconic roadster.",
        chars:" ",
        speed:0.6,
        tweenLength:false
      }
    }, "-=0.1")

    // Second video reveal
    .to(".reveal", {
      clipPath:"circle(150% at 50% 50%)",
      duration:1.4,
      ease:"power2.inOut",
      onStart:()=>{
        const vid=document.getElementById("revealVid");
        if(vid){ vid.currentTime=0; vid.play().catch(()=>{}); }
      }
    }, "+=0.6");

  // Scroll interactions for hero text
  const scrollY = [
    {selector:"[hero-char]", y:-110, rot:10, start:"bottom center"},
    {selector:"[hero-char2]", y:-100, rot:10, start:"bottom 30%"},
    {selector:"[hero-num]", y:-120, rot:9, start:"bottom 30%"}
  ];
  scrollY.forEach(cfg=>{
    gsap.utils.toArray(cfg.selector).forEach(el=>{
      gsap.fromTo(el,{yPercent:0,rotateZ:0},{
        yPercent:cfg.y, rotateZ:cfg.rot, scrollTrigger:{
          scrub:true, trigger:".hero", start:cfg.start, end:"+=100%"
        }
      });
    });
  });

  // Parallax effect (from 43480.js)
  gsap.utils.toArray("[data-scroll-speed]").forEach(el=>{
    const speed=parseFloat(el.dataset.scrollSpeed);
    ScrollTrigger.create({
      trigger:el,
      start:"top bottom",
      end:"bottom top",
      scrub:true,
      onUpdate:self=>{
        const progress=self.progress;
        const distance=window.innerHeight+el.offsetHeight;
        const y=(progress-0.065)*distance*-speed;
        gsap.set(el,{y});
      }
    });
  });

});
