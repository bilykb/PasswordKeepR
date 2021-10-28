/******  LAYOUT ANIMATIONS *******/

//Intro animation

const tl = gsap.timeline();
gsap.registerPlugin(SplitText);
const mySplitText = new SplitText(".intro_logo h1", {
  type: 'chars'
});








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
      delay: 0.7,
    });
    tl.fromTo('.intro_logo h1 div', {
      y: '150%'
    }, {
      y: 0,
      duration: 2,
      ease: 'Expo.easeOut',
      stagger: 0.1,
    }, 0.1);
    tl.to('.intro_logo h1', {
      opacity: 0,
      duration: 0.3
    }, 1.1);
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
  export function animateSideBarIn(element) {

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

  export function animateSideBarOut(element) {
    $(".in_view").removeClass("in_view")
    const tween = gsap.to(element, {
      opacity: 0,
      x: '100%',
      ease: 'Expo.easeOut',
      duration: 2,
    })
    $(".viewport_overlay").removeClass("is_hidden");
  }









