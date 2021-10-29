/******  LAYOUT ANIMATIONS *******/
$(() => {

  gsap.registerPlugin(SplitText, AttrPlugin);
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
          setTimeout(() => {
            if (tick >= 0.2) {
              animate.setSpeed(tick)
            }
            tick -= 0.01
          }, 200);
         },
        duration: 5,
        ease: Expo.easeOut,
      })
    }

    const loginAnimation = function() {
      intro.fromTo(".login_left h1 div", {
        y: '100%',
      }, {
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }, 0.5);
      intro.from(".login_left", {
        width: '100%',
        duration: 2,
        ease: Expo.easeOut
      }, 2)
      intro.from(".login_right", {
        width: '0%',
        duration: 2,
        ease: Expo.easeOut,
        onStart: function() {
          $(".login_left svg").fadeIn(600);
        },
        onUpdate: function() {
          setTimeout(() => {
            if (tick >= 0.2) {
              animate.setSpeed(tick)
            }
            tick -= 0.01
          }, 200);
         },
      }, 2);
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
    const heading1 = toAnimate.push($('.personal_passwords_container h2')[0]);
    const privateList = toAnimate.push($($('.password_list')[0]).find("li"));
    const heading2 = toAnimate.push($('.organization_passwords_container h2')[0]);
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

    }, 3)
  }


  if (!sessionStorage.getItem("isVisited")) {
      introAnimation();
    };
    sessionStorage.setItem('isVisited', 'true');

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


window.animateSideBarIn = animateSideBarIn;
window.animateSideBarOut = animateSideBarOut;

})



