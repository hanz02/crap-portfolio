export default function getCatOffset(catType = "") {
  const cat = document.querySelector(".hero-cat" + catType);
  const curtain = document.querySelector("#welcome-curtain");
  const catRect = cat.getBoundingClientRect();
  const curtainRect = curtain.getBoundingClientRect();

  const catLeftOffset = catRect.left;
  const catRightOffset = catRect.right;
  const catTopOffset = catRect.top;
  const catBottomOffset = catRect.bottom;

  //todo position threshold bars around the cat, test the reliability of this function
  document.querySelector(".threshold-bar-y").style.left =
    curtainRect.left + "px";
  document.querySelector(".threshold-bar-y-2").style.left =
    curtainRect.right + "px";
  document.querySelector(".threshold-bar-cat").style.top =
    catTopOffset - 30 + "px";

  return {
    catLeftOffset: catRect.left,
    catRightOffset: catRect.right,
    catTopOffset: catRect.top + 20,
    catBottomOffset: catRect.bottom,
  };
}
