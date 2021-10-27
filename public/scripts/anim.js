/******  LAYOUT ANIMATIONS *******/

$(() => {

  const introAnimation = function() {

    const tl = gsap.timeline();

    const toAnimate = [];
    const heading1 = toAnimate.push($('.personal_passwords_container h2')[0]);
    const privateList = toAnimate.push($($('.password_list')[0]).find("li"));
    const heading2 = toAnimate.push($('.organization_passwords_container h2')[0]);
    const orgList = toAnimate.push($($('.password_list')[1]).find("li"));
    const navbackground = $("nav .background")[0];

    tl.fromTo(navbackground, {
      x: '-100%',
    }, {
      x: 0,
      duration: 2,
      ease:'Expo.easeOut'
    });
    tl.fromTo(toAnimate, {
      opacity: 0,
      y: '100%',
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 2,
      ease:'Expo.easeOut'
    }, 1);
    tl.fromTo('.create_new_password', {
      opacity: 0,
      y: '100%'
    }, {
      opacity: 1,
      y: 0,
      duration: 3,
      stagger: 0.2,
      ease: 'Expo.easeOut'
    }, 2)
  }

  if (!sessionStorage.getItem("isVisited")) {
    introAnimation();
  };

  sessionStorage.setItem('isVisited', 'true');
})

