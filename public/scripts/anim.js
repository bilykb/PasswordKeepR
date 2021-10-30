/******  LAYOUT ANIMATIONS *******/
$(document).ready(function() {

  gsap.registerPlugin(SplitText, AttrPlugin, CSSRulePlugin, DrawSVGPlugin);
  const mySplitText = new SplitText(".login_left h1", {
    type: 'chars'
  });

  const tl = gsap.timeline();
  const intro = gsap.timeline();


  const animate = lottie.loadAnimation({
    container: document.querySelector(".login_left"),
    renderer: 'svg',
    autoplay: true,
    loop:true,
    path: '/assets/lottie/looping_ring.json'
  });
  animate.setSpeed(2.5);

  let tick = 2;

  $(window).on("load", function() {

    const defaultLogin = function() {
      $(".login_left svg").fadeIn(600);
      intro.to(animate, {
        onUpdate: function() {
            if (tick >= 0.2) {
              animate.setSpeed(tick)
            }
            tick -= 0.01
         },
        duration: 5,
        ease: Expo.easeOut,
      });
      intro.to(".disclaimer", {
        opacity: 1,
        duration: 2
      }, 0)
    }

    const loginAnimation = function() {
      intro.fromTo(".login_left h1 div", {
        y: '150',
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }, 0.5);
      intro.from(".login_left", {
        width: '100%',
        duration: 2,
        ease: Expo.easeOut
      }, 2);
      intro.from(".login_right", {
        width: '0%',
        duration: 2,
        ease: Expo.easeOut,
        onStart: function() {
          $(".login_left svg").fadeIn(600);
        },
        scrub: 2
      }, 2);
      intro.fromTo(".login_left", 2, {
        backgroundPosition: '100% 100%',
      }, {
        backgroundPosition: '0% 0%',
        ease: Linear.easeNone,
        onComplete: function() {
          $(".login_left").addClass("default_bg_anim")
        }
      }, 0);
      intro.to(animate, {
        onUpdate: function() {
            if (tick >= 0.2) {
              animate.setSpeed(tick)
            }
            tick -= 0.01
         },
        duration: 5,
        ease: Expo.easeOut,
      });
      intro.to(".disclaimer", {
        opacity: 1,
        duration: 2
      }, 1.8)
    };
    if (!sessionStorage.getItem("loginIntroDone")) {
      loginAnimation();
    } else {
      defaultLogin();
    }
    sessionStorage.setItem('loginIntroDone', 'true');

  })

  const introAnimation = function() {
    const toAnimate = [];
    const heading1 = toAnimate.push($('.personal_passwords_container h1')[0]);
    const privateList = toAnimate.push($($('.password_list')[0]).find("li"));
    const heading2 = toAnimate.push($('.organization_passwords_container h1')[0]);
    const orgList = toAnimate.push($($('.password_list')[1]).find("li"));
    const navbackground = $("nav .background")[0];

    tl.fromTo(navbackground, {
      scaleX: 10,
      transformOrigin: 'left'
    }, {
      scaleX: 1,
      duration: 2,
      ease:'Expo.easeOut',
    });
    tl.fromTo(toAnimate, {
      opacity: 0,
      y: '100%',
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 3,
      ease:'Expo.easeOut',

    }, 1);
    tl.fromTo('.create_new_password', {
      opacity: 0,
      y: '100%'
    }, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'Expo.easeOut',

    }, 2);
    tl.fromTo('nav h1, .nav_right, .dropdown', {
      opacity: 0,
      6: '-100%'
    }, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'Expo.easeOut',

    }, 2.5)
  }


  if (!sessionStorage.getItem("isVisited")) {
      introAnimation();
    };
    sessionStorage.setItem('isVisited', 'true');
})

  //Sidebar animations
  function animateSideBarIn(element) {

    const innerElements = [];

    const $heading = $(".in_view h2");
    const $formInputs = $($($heading).next("form")).children();
    innerElements.push($heading, $formInputs)

    const timeline = gsap.timeline();
    timeline.to(element, {
      opacity: 1,
      x: 0,
      ease: 'Expo.easeOut',
      duration: 1,
    });
    timeline.fromTo(innerElements, {
      y: '100%',
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: Expo.easeout
    }, 0.2)
    $(".viewport_overlay").removeClass("is_hidden");
  }

  function animateSideBarOut(element) {
    $(".in_view").removeClass("in_view")
    const tween = gsap.to(element, {
      opacity: 0,
      x: '100%',
      ease: 'Expo.easeOut',
      duration: 2,
    })
    $(".viewport_overlay").removeClass("is_hidden");
  }


  function animateStroke(element) {
    gsap.fromTo(element, {
      drawSVG: '0%'
    }, {
      drawSVG: '100%',
      duration: 4,
      ease: Power4.easeOut
    })
  }



window.animateSideBarIn = animateSideBarIn;
window.animateSideBarOut = animateSideBarOut;
window.animateStroke = animateStroke;

