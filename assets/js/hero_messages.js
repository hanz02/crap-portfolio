import getCatOffset from "./cat_offset.js";
import { getCurrentMiddleIndex, setCurrentMiddleIndex } from "./hero_global.js";
import {
  travelGetMiddleMessagesList,
  checkMessageListBlockingCat,
} from "./get_middle_messages.js";

const scrollDistance = 70;
const catInnerPadding = 13;
var isBlocking = false;

var scrollTransitionValue = 0;

const hero_cat = document.querySelector(".hero-cat.light-cat");
const main_star = document.querySelector("#main-star");
const floor = document.querySelector(".floor");

const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

export function toggleCatFloorBlur(toBlur) {
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

export function searchMiddleMessage(direction, isEnd, catThreshold) {
  if (isEnd) return;

  var messages = document.querySelectorAll(".message");

  //! debug: cat left and right threshold bar
  // document.querySelector(".threshold-bar-y").style.left = catLeftOffset + "px";
  // document.querySelector(".threshold-bar-y-2").style.left =
  //   catRightOffset + "px";

  //* get current middle index
  var middleIndex =
    getCurrentMiddleIndex() === "no element"
      ? Math.floor(messages.length / 2)
      : getCurrentMiddleIndex();

  var counter = 8;
  var tempMiddleIndex = -1;
  var toBlur = false;

  // console.log("currentMiddleIndex ====> ", getCurrentMiddleIndex());

  // ======> new version
  //todo try to use the travelGetMiddleMessagesList function to achieve
  const catOffsets = getCatOffset(".light-cat");
  const messagesList = travelGetMiddleMessagesList(
    catOffsets,
    messages,
    middleIndex,
    direction,
    scrollDistance,
  );

  const { isBlockingCat, latestMiddleMessageIndex } =
    checkMessageListBlockingCat(
      messagesList,
      catOffsets,
      catOffsets.catTopOffset,
      direction,
      scrollDistance,
    );

  setIsBlockingCat(isBlockingCat);

  toggleCatFloorBlur(getIsBlockingCat());
  setCurrentMiddleIndex(latestMiddleMessageIndex);
  // document.querySelector(".middleMessageContent").innerHTML =
  //   messages[latestMiddleMessageIndex].querySelector(
  //     ".hover-message",
  //   ).innerHTML;
  // ====>
}

export function messageLeftScroll(catThreshold) {
  document.querySelector("#btn-right").classList.add("active");

  const msg_containers = document.querySelector(".messages-container");
  let messageContainerLeft = msg_containers.getBoundingClientRect().left;

  var isEnd = true;
  //! debug threshold
  // document.querySelector(".threshold-bar-cat").style.top = catThreshold + "px";

  if (messageContainerLeft < -10) {
    scrollTransitionValue += scrollDistance;

    document.querySelector(".messages-container").style.transform =
      "translateX(" + scrollTransitionValue + "px)";

    isEnd = false;
  }

  if (msg_containers.getBoundingClientRect().left + scrollDistance >= 0)
    document.querySelector("#btn-left").classList.remove("active");

  searchMiddleMessage("left", isEnd, catThreshold);
}

export function messageRightScroll(catThreshold) {
  document.querySelector("#btn-left").classList.add("active");

  const msg_container = document.querySelector(".messages-container");

  var messageContainerRight =
    window.innerWidth -
    (msg_container.getBoundingClientRect().left + msg_container.offsetWidth);

  var isEnd = true;

  //! debug: cat threshold bar
  // document.querySelector(".threshold-bar-cat").style.top = catThreshold + "px";

  if (messageContainerRight < -10) {
    scrollTransitionValue -= scrollDistance;

    msg_container.style.transform =
      "translateX(" + scrollTransitionValue + "px)";

    isEnd = false;
  }

  var messageContainerRight =
    window.innerWidth -
    (msg_container.getBoundingClientRect().left + msg_container.offsetWidth);

  // console.log("messageContainerRight =====> ", messageContainerRight);

  // console.log(
  //   "messageContainerRight using OFFSET =====> ",
  //   msg_container.getBoundingClientRect().right,
  // );

  if (messageContainerRight + scrollDistance >= 0)
    document.querySelector("#btn-right").classList.remove("active");

  searchMiddleMessage("right", isEnd, catThreshold);
}

export function messageHoverIn(message, catThreshold) {
  // document.querySelector(".threshold-bar-cat").style.top = catThreshold + "px";

  //   console.log(message);
  message.classList.add("hovered");
  // message.querySelector(".message-predict").style.marginBlock =
  //   parseFloat(message.dataset.defaultPadding) + 8 + "px";

  // message.querySelector(".message-predict").classList.add("hovered");
  const scrollTransitionValue = getComputedStyle(message).transition;
  if (!scrollTransitionValue.includes("padding-block")) {
    message.style.transition =
      scrollTransitionValue +
      ", padding-block 750ms ease-out 0ms" +
      ", transform 750ms cubic-bezier(.05, .52, .07, 1.02) 0ms";
  }

  message.style.paddingBlock =
    parseFloat(message.dataset.defaultPadding) + 8 + "px";

  const inner_message = message.querySelector(".msg-inner");

  const messageRightOffset = inner_message.getBoundingClientRect().right + 8;
  const messageLeftOffset = inner_message.getBoundingClientRect().left - 8;

  //* offset in jeury seems to be different from vanilla JS, look at the above two which gets the offset relat8ve to screen correctly
  //* knowledge: The offsetTop property in JavaScript is not relative to the screen or the viewport. Instead, it returns the distance of an element's top border edge from the top padding edge of its offsetParent.
  const hovered_message = message.querySelector(".hover-message");

  const messageBottomOffset =
    hovered_message.getBoundingClientRect().top +
    hovered_message.offsetHeight +
    8;

  const { catLeftOffset, catRightOffset } = getCatOffset(".light-cat");

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

  // console.log();

  // console.log("messageBottomOffset ===> ", messageBottomOffset);
  // console.log("messageLeftOffset ===> ", messageLeftOffset);
  // console.log("messageRightOffset ===> ", messageRightOffset);

  // console.log("\n\ncatLeftOffset ===> ", catLeftOffset);
  // console.log("catRightOffset ===> ", catRightOffset);

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

export function messageHoverOut(message) {
  setTimeout(() => {
    message.classList.remove("hovered");
  }, 100);

  //todo check if current hover out is the blocking messages
  toggleCatFloorBlur(getIsBlockingCat());
  message.style.paddingBlock = message.dataset.defaultPadding + "px";
}

export function setIsBlockingCat(input) {
  isBlocking = input;
}

export function getIsBlockingCat() {
  return isBlocking;
}
