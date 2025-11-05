const scrollDistance = 70;
const catInnerPadding = 13;
var isBlocking = false;

var transitionValue = 0;

const hero_cat = document.querySelector(".hero-cat.light-cat");
const main_star = document.querySelector("#main-star");
const floor = document.querySelector(".floor");

const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

function toggleCatFloorBlur(toBlur) {
  if (toBlur) {
    hero_cat.classList.add("blur");
    main_star.classList.add("blur");
    floor.classList.add("blur");
  } else {
    hero_cat.classList.remove("blur");
    main_star.classList.remove("blur");
    floor.classList.remove("blur");
  }
}

var currentMiddleIndex = "no element";

function searchMiddleMessage(direction, isEnd, catThreshold) {
  if (isEnd) return;

  var messages = document.querySelectorAll(".message p");
  const catLeftOffset =
    document.querySelector("#welcome-curtain").getBoundingClientRect().left +
    catInnerPadding;
  const catRightOffset =
    document.querySelector("#welcome-curtain").getBoundingClientRect().left +
    document.querySelector("#welcome-curtain").offsetWidth -
    catInnerPadding;

  //! debug: cat left and right threshold bar
  // document.querySelector(".threshold-bar-y").style.left = catLeftOffset + "px";
  // document.querySelector(".threshold-bar-y-2").style.left =
  //   catRightOffset + "px";

  //* get current middle index
  var index =
    currentMiddleIndex === "no element"
      ? Math.floor(messages.length / 2)
      : currentMiddleIndex;

  var counter = 8;
  var tempMiddleIndex = -1;
  var toBlur = false;

  console.log("currentMiddleIndex ====> ", currentMiddleIndex);

  //! for debug only
  let finalBottomOffset = 0;
  while (counter > 0) {
    // if (condition) {
    // }
    var color = direction === "right" ? "skyblue" : "green";

    //! debug message border
    // messages[index].style.border = "solid 2px " + color;

    var msgRightOffset =
      messages[index].getBoundingClientRect().left +
      messages[index].offsetWidth;

    msgRightOffset =
      direction === "right"
        ? msgRightOffset - scrollDistance
        : msgRightOffset + scrollDistance;

    var msgMiddleOffset = msgRightOffset - messages[index].offsetWidth / 2;
    // document.querySelector(".threshold-bar-msg-mid").style.left =
    //   msgMiddleOffset + "px";
    // document.querySelector(".threshold-bar-msg-mid").style.border =
    //   "solid mediumaquamarine 1px";

    const msgLeftOffset =
      direction === "right"
        ? messages[index].getBoundingClientRect().left - scrollDistance
        : messages[index].getBoundingClientRect().left + scrollDistance;

    console.log(
      "parseInt($(messages[index]).closest ====> " +
        parseInt($(messages[index]).closest(".message").css("top"))
    );

    const msgBottomOffset =
      parseFloat(
        window
          .getComputedStyle(messages[index].closest(".message"))
          .getPropertyValue("top")
      ) +
      messages[index].querySelector(".hover-message").offsetHeight +
      parseFloat(
        window
          .getComputedStyle(document.querySelector(".banner__graphics"))
          .getPropertyValue("padding-top")
      );

    if (
      (msgLeftOffset > catLeftOffset && msgLeftOffset < catRightOffset) ||
      (msgRightOffset > catLeftOffset && msgRightOffset < catRightOffset) ||
      (msgMiddleOffset > catLeftOffset && msgMiddleOffset < catRightOffset)
    ) {
      //! debug message border
      // messages[index].style.border = "solid 2px pink";
      tempMiddleIndex = index;
      // console.log("msgBottomOffset ====> ", msgBottomOffset);
      // console.log("catThreshold ====> ", catThreshold);

      if (msgBottomOffset > catThreshold) {
        //! debug message border
        // messages[index].style.border = "solid 2px red";
        // document.querySelector(".threshold-bar-msg-mid").style.border =
        //   "solid red 1px";

        // console.log("BLOCKED IN THE WAY ======!! ");

        currentMiddleIndex = index;
        toBlur = true;

        finalBottomOffset = msgBottomOffset;

        break;
      }
    }

    if (
      direction === "right" &&
      msgLeftOffset > catLeftOffset &&
      msgRightOffset > catLeftOffset
    ) {
      break;
    }

    if (
      direction === "left" &&
      msgLeftOffset < catRightOffset &&
      msgRightOffset < catRightOffset
    ) {
      break;
    }

    //* if no messages are blocking the cat, assign latest in range middle index to the current middle index

    //* traverse up and down
    direction === "right" ? index-- : index++;

    //* amount of elements to traverse, count down
    counter--;
  }

  if (!toBlur || currentMiddleIndex === "no element")
    currentMiddleIndex = tempMiddleIndex;

  console.log(
    "currentMiddleIndex : : : " +
      document.querySelectorAll(".message p")[currentMiddleIndex].textContent
  );

  // console.log("cat threshold ====> ", catThreshold);

  // console.log("finalBottomOffset ====> ", finalBottomOffset);

  isBlocking = toBlur;
  toggleCatFloorBlur(toBlur);
}

function messageLeftScroll(catThreshold) {
  console.log(
    document.querySelector(".messages-container").getBoundingClientRect().left
  );
  const msg_containers = document.querySelector(".messages-container");
  const messageContainerLeft = msg_containers.getBoundingClientRect().left;

  var isEnd = true;
  //! debug threshold
  // document.querySelector(".threshold-bar-cat").style.top = catThreshold + "px";

  if (messageContainerLeft < -10) {
    transitionValue += scrollDistance;

    document.querySelector(".messages-container").style.transform =
      "translateX(" + transitionValue + "px)";

    console.log(
      "LEFT :: " + document.querySelector(".messages-container").style.transform
    );

    isEnd = false;
  }

  searchMiddleMessage("left", isEnd, catThreshold);
}

function messageRightScroll(catThreshold) {
  msg_container = document.querySelector(".messages-container");

  var messageContainerRight =
    window.innerWidth -
    (msg_container.getBoundingClientRect().left + msg_container.offsetWidth);

  var isEnd = true;

  //! debug: cat threshold bar
  // document.querySelector(".threshold-bar-cat").style.top = catThreshold + "px";

  if (messageContainerRight < -10) {
    transitionValue -= scrollDistance;

    msg_container.style.transform = "translateX(" + transitionValue + "px)";

    console.log(
      "RIGHT : : " +
        document.querySelector(".messages-container").style.transform
    );

    isEnd = false;
  }

  searchMiddleMessage("right", isEnd, catThreshold);
}

function messageHoverIn(message, catThreshold) {
  //   console.log(message);
  message.classList.add("hovered");
  // message.querySelector(".message-predict").style.marginBlock =
  //   parseFloat(message.dataset.defaultPadding) + 8 + "px";

  // message.querySelector(".message-predict").classList.add("hovered");
  const transitionValue = getComputedStyle(message).transition;
  if (!transitionValue.includes("padding-block")) {
    message.style.transition =
      transitionValue +
      ", padding-block 750ms ease-out 0ms" +
      ", transform 750ms cubic-bezier(.05, .52, .07, 1.02) 0ms";
  }

  message.style.paddingBlock =
    parseFloat(message.dataset.defaultPadding) + 8 + "px";

  const inner_message = message.querySelector(".msg-inner");
  const welcome_curtain = document.querySelector("#welcome-curtain");

  const messageRightOffset = inner_message.getBoundingClientRect().right + 8;
  const messageLeftOffset = inner_message.getBoundingClientRect().left - 8;

  //todo: offset in jeury seems to be different from vanilla JS, look at the above two which gets the offset relat8ve to screen correctly
  //* knowledge: The offsetTop property in JavaScript is not relative to the screen or the viewport. Instead, it returns the distance of an element's top border edge from the top padding edge of its offsetParent.
  const hovered_message = message.querySelector(".hover-message");

  const messageBottomOffset =
    hovered_message.getBoundingClientRect().top +
    hovered_message.offsetHeight +
    8;

  const catLeftOffset =
    welcome_curtain.getBoundingClientRect().left + catInnerPadding;
  const catRightOffset =
    welcome_curtain.getBoundingClientRect().left +
    welcome_curtain.offsetWidth -
    catInnerPadding;

  //! debug threshold
  // document.querySelector(".threshold-bar").style.top =
  //   messageBottomOffset + "px";

  // document.querySelector(".threshold-bar-y").style.left = catLeftOffset + "px";
  // document.querySelector(".threshold-bar-y-2").style.left =
  //   catRightOffset + "px";

  // document.querySelector(".threshold-bar-msg").style.left =
  //   messageRightOffset + "px";

  // document.querySelector(".threshold-bar-msg-2").style.left =
  //   messageLeftOffset + "px";

  // document.querySelector(".threshold-bar").style.border = "2px solid blue";

  //* do nothing if the message is above the cat height threshold
  if (messageBottomOffset < catThreshold) return;

  //* if either left or right offset of the message is within the cat horizontal threshold range
  if (
    (messageRightOffset > catLeftOffset &&
      messageRightOffset < catRightOffset) ||
    (messageLeftOffset > catLeftOffset && messageLeftOffset < catRightOffset)
  ) {
    toggleCatFloorBlur(true);

    //! threshold debug
    // document.querySelector(".threshold-bar").style.border = "2px solid red";
    return;
  }
}

function messageHoverOut(message) {
  setTimeout(() => {
    message.classList.remove("hovered");
  }, 100);

  //todo check if current hover out is the blocking messages
  isBlocking ? toggleCatFloorBlur(true) : toggleCatFloorBlur(false);
  message.style.paddingBlock = message.dataset.defaultPadding + "px";
}

$(document).ready(function () {});
