document.addEventListener("DOMContentLoaded", function () {
  // Register our GSAP ScrollTrigger plugin
  // https://gsap.com/docs/v3/Plugins/ScrollTrigger/
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  // Create a timeline animation with GSAP.
  let tl = gsap.timeline();

  // this gsap animation should only occur in desktop view
  // we can use https://gsap.com/docs/v3/GSAP/gsap.matchMedia() to achieve this
  /** from the documentation
   * 
   * let mm = gsap.matchMedia();
      mm.add("(min-width: 800px)", () => {
        // desktop setup code here...
      });

      mm.add("(max-width: 799px)", () => {
        // mobile setup code here...
      });

   */
  let mm = gsap.matchMedia();

  mm.add("(min-width: 760px)", () => {
    tl.to(".intro-bg", {
      // we first want to pin the background so it stays in place as we scroll down
      scrollTrigger: {
        trigger: ".intro-bg",
        scrub: true,
        pin: true,
        endTrigger: ".description",
        pinSpacing: false,
        // markers: true,
      },
    });
    tl.to(".background-gradient", {
      // as we're scrolling to our description section the gradient should now start appearing
      // the gradient has z index so we can still see the text
      scrollTrigger: {
        trigger: ".description",
        start: "top bottom",
        scrub: true,
      },
      opacity: 0.75,
    })
      .to(".cta", {
        // as we're scrolling and going to our description section, fade the cta button out
        scrollTrigger: {
          trigger: ".description",
          scrub: true,
          start: "top bottom",
          end: "+=50% center", // half way up from the end so our button fades out
        },
        opacity: 0,
      })
      .to(".intro-bg", {
        // our intro-bg should start fading away too the more we scroll down the page
        scrollTrigger: {
          trigger: ".description",
          scrub: true,
        },
        opacity: 0,
      })
      .to(".cloud-left", {
        // the left should start moving in from the left as we scroll down
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
        },
        yoyo: true,
        repeat: 1,
        x: "20%",
      })
      // this should only happen after the cloud left has moved in
      .to(".flower-left", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
          start: "top center",
          end: "+=50% center",
        },
        opacity: 1,
        scale: 1,
        // x: "1%",
      })
      .to(".center-shape", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
          pin: true,
          start: "top top",
          end: "+=85% center",
        },
        opacity: 1,
      })
      .to(".cloud-right", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
        },
        yoyo: true,
        repeat: 1,
        opacity: 1,
        x: "-10%",
      })
      // now we want our ".flower-right" to appear as the cloud-right has finished moving in
      // it should pop in
      .to(".flower-right", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
          start: "center center",
          end: "+=25% center",
        },
        // scale our flower from 0 to 1
        scale: 1,
      })
      /** buy adjusting the end values we can make the opacitys trigger at different points */
      .to(".botanicals", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
          start: "top center",
          end: "+=70% center",
        },
        opacity: 1,
      })
      .to(".nootropics", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
          start: "top center",
          end: "+=50% center",
        },
        opacity: 1,
      })
      .to(".adaptogens", {
        scrollTrigger: {
          trigger: ".information",
          scrub: true,
          start: "top center",
          end: "+=80% center",
        },
        opacity: 1,
      })
      // we want to animate our circle svg in the adaptogens
      .to(".adaptogens circle", {
        scrollTrigger: {
          trigger: ".information",
          scrub: 3, // this gives the scrolling a bit of a slower effect!
          start: "+=50% center",
        },
        /**
         * this effect comes from https://codepen.io/benoitalix/details/xwWzeB
         * showcasing the variables of stroke-dasharray and stroke-dashoffset
         * it draws the circle svg
         */
        strokeDashoffset: 0,
      })
      // we want to animate our circle svg in the botanicals as well
      .to(".botanicals circle", {
        scrollTrigger: {
          trigger: ".information",
          scrub: 2,
          start: "+=30% center",
        },
        strokeDashoffset: 0,
      })
      // now finally lets hide the can and continue on with the rest of the site
      .to(".kin-can", {
        scrollTrigger: {
          trigger: ".center-shape",
          scrub: 2,
          start: "top top",
        },
        opacity: 0,
        zIndex: -1,
      });
  });

  // add animation for mobile only views
  mm.add("(max-width: 759px)", () => {
    tl.to(".background-gradient", {
      opacity: 0.75,
    })
      .to(".cloud-left", {
        opacity: 1,
      })
      .to(".cloud-right", {
        opacity: 1,
      })
      .to(".botanicals", {
        opacity: 1,
      })
      .to(".nootropics", {
        opacity: 1,
      })
      .to(".adaptogens", {
        opacity: 1,
      });
  });

  /** use scroll to to transition down the page */
  function animatedScrollTo(element, elementToGoTo) {
    element.addEventListener("click", (e) => {
      // prevent the default behaviour by using preventDefault
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault#blocking_default_click_handling
      e.preventDefault();
      gsap.to(window, { duration: 1, scrollTo: elementToGoTo });
    });
  }

  const learnLink = document.querySelector(".learn");
  animatedScrollTo(learnLink, "#information");
  const shopLink = document.querySelector(".shop");
  animatedScrollTo(shopLink, ".carousel");
  const subscribeLink = document.querySelector(".subscribe");
  // we can just scroll to the footer
  animatedScrollTo(subscribeLink, "footer");

  const heroButton = document.querySelector(".cta .button");
  animatedScrollTo(heroButton, ".carousel");

  /**
   * Using GLIDE JS for our image carousel
   * https://glidejs.com/
   * starting with our base example from https://glidejs.com/docs/options/#type
   */
  var glide = new Glide(".glide", {
    type: "carousel",
    focusAt: "center",
    startAt: 1, // we wantt to start at the second image
    perView: 3,
    // https://glidejs.com/docs/options/#breakpoints
    breakpoints: {
      1024: {
        perView: 1,
      },
    },
  });

  /* mount the glide slider */
  glide.mount();

  /**
   * Carousel can sounds
   * Sounds sourced from: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/soda-can-79
   */

  // get our left and right buttons
  const buttonLeft = document.querySelector(".glide__arrow--left");
  const buttonRight = document.querySelector(".glide__arrow--right");

  /** create a function for playing the sound when clicked */
  function playCanOpeningSound() {
    // play the sound
    // https://stackoverflow.com/a/18628124
    var audio = new Audio("/sounds/opening_can_sound.mp3");
    audio.play();
  }

  buttonLeft.addEventListener("click", function () {
    playCanOpeningSound();
  });

  buttonRight.addEventListener("click", function () {
    playCanOpeningSound();
  });
});
