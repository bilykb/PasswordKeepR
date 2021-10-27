/******  LAYOUT ANIMATIONS *******/

const tl = gsap.timeline();

const toAnimate = [];
const heading1 = toAnimate.push($('.personal_passwords_container h2')[0]);
const privateList = toAnimate.push($($('.password_list')[0]).find("li"));
const heading2 = toAnimate.push($('.organization_passwords_container h2')[0]);
const orgList = toAnimate.push($($('.password_list')[1]).find("li"));



tl.to(toAnimate, {
  opacity: 1,
  y: 0,
  duration: 3,
  stagger: 0.2,
  ease: 'Expo.easeOut'
});
