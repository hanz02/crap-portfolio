const scrollDistance = 70;
const catInnerPadding = 13;
var isBlocking = false;

var transitionValue = 0;

function toggleCatFloorBlur(toBlur) {
  if (toBlur) {
    $(".hero-cat").addClass("blur");
    $("#main-star").addClass("blur");
    $(".floor").addClass("blur");
  } else {
    $(".hero-cat").removeClass("blur");
    $("#main-star").removeClass("blur");
    $(".floor").removeClass("blur");
  }
}

var currentMiddleIndex = "no element";

function searchMiddleMessage(direction, isEnd, catThreshold) {
  if (isEnd) return;

  var messages = $(".message p");
  const catLeftOffset = $("#welcome-curtain").offset().left + catInnerPadding;
  const catRightOffset =
    $("#welcome-curtain").offset().left +
    $("#welcome-curtain").outerWidth() -
    catInnerPadding;

  //! debug: cat left and right threshold bar
  $(".threshold-bar-y").css("left", catLeftOffset + "px");
  $(".threshold-bar-y-2").css("left", catRightOffset + "px");

  var index =
    currentMiddleIndex === "no element"
      ? Math.floor(messages.length / 2)
      : currentMiddleIndex;

  var counter = 6;
  var tempMiddleIndex = -1;
  var toBlur = false;

  while (counter > 0) {
    var color = direction === "right" ? "skyblue" : "green";
    $(messages[index]).css("border", "solid 2px " + color);

    var msgRightOffset =
      $(messages[index]).offset().left + $(messages[index]).outerWidth();

    msgRightOffset =
      direction === "right"
        ? msgRightOffset - scrollDistance
        : msgRightOffset + scrollDistance;

    var msgMiddleOffset = msgRightOffset - $(messages[index]).outerWidth() / 2;
    $(".threshold-bar-msg-mid").css("left", msgMiddleOffset + "px");
    $(".threshold-bar-msg-mid").css("border", "solid mediumaquamarine 1px");

    const msgLeftOffset =
      direction === "right"
        ? $(messages[index]).offset().left - scrollDistance
        : $(messages[index]).offset().left + scrollDistance;

    const msgBottomOffset =
      parseInt($(messages[index]).closest(".message").css("top")) +
      $(messages[index]).find(".hover-message").outerHeight(true) +
      parseInt($(".banner__graphics").css("padding-top"));

    if (
      (msgLeftOffset > catLeftOffset && msgLeftOffset < catRightOffset) ||
      (msgRightOffset > catLeftOffset && msgRightOffset < catRightOffset) ||
      (msgMiddleOffset > catLeftOffset && msgMiddleOffset < catRightOffset)
    ) {
      $(messages[index]).css("border", "solid 2px pink");
      tempMiddleIndex = index;
      if (msgBottomOffset > catThreshold) {
        $(messages[index]).css("border", "solid 2px red");
        $(".threshold-bar-msg-mid").css("border", "solid red 1px");

        currentMiddleIndex = index;
        toBlur = true;

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
    "currentMiddleIndex : : : " + $($(".message p")[currentMiddleIndex]).text()
  );
  isBlocking = toBlur;
  toggleCatFloorBlur(toBlur);
}

function messageLeftScroll(catThreshold) {
  console.log($(".messages-container").position().left);
  const messageContainerLeft = $(".messages-container").position().left;

  var isEnd = true;

  $(".threshold-bar-cat").css("top", catThreshold + "px");

  if (messageContainerLeft < -10) {
    transitionValue += scrollDistance;

    $(".messages-container").css({
      transform: "translateX(" + transitionValue + "px)",
    });

    console.log("LEFT :: " + $(".messages-container").css("transform"));

    isEnd = false;
  }

  searchMiddleMessage("left", isEnd, catThreshold);
}

function messageRightScroll(catThreshold) {
  var messageContainerRight =
    $(window).width() -
    ($(".messages-container").offset().left +
      $(".messages-container").outerWidth());

  var isEnd = true;

  //! debug: cat threshold bar
  $(".threshold-bar-cat").css("top", catThreshold + "px");

  if (messageContainerRight < -10) {
    transitionValue -= scrollDistance;

    $(".messages-container").css({
      transform: "translateX(" + transitionValue + "px)",
    });

    console.log("RIGHT : : " + $(".messages-container").css("transform"));

    isEnd = false;
  }

  searchMiddleMessage("right", isEnd, catThreshold);
}

function messageHoverIn(thisElement, catThreshold) {
  //   console.log(thisElement);
  $(thisElement).addClass("hovered");
  $(thisElement).find(".message-predict").css({
    // "margin-block": $(thisElement).data("defaultPadding") + 8 + "px",
  });
  $(thisElement).find(".message-predict").addClass("hovered");

  if (!$(thisElement).css("transition").includes("padding-block")) {
    $(thisElement).css({
      transition:
        thisElement.css("transition") +
        ", padding-block 750ms ease-out 0ms" +
        ", transform 750ms cubic-bezier(.05, .52, .07, 1.02) 0ms",
    });
  }

  $(thisElement).css({
    "padding-block": $(thisElement).data("defaultPadding") + 8 + "px",
  });
  const messageRightOffset =
    $(thisElement).find(".msg-inner").offset().left +
    $(thisElement).find(".msg-inner").width() +
    8;
  const messageLeftOffset = $(thisElement).find(".msg-inner").offset().left - 8;

  const messageBottomOffset =
    $(thisElement).find(".hover-message").offset().top +
    $(thisElement).find(".hover-message").outerHeight(true) +
    8;

  const catLeftOffset = $("#welcome-curtain").offset().left + catInnerPadding;
  const catRightOffset =
    $("#welcome-curtain").offset().left +
    $("#welcome-curtain").outerWidth() -
    catInnerPadding;

  $(".threshold-bar").css("top", messageBottomOffset + "px");

  $(".threshold-bar-y").css("left", catLeftOffset + "px");
  $(".threshold-bar-y-2").css("left", catRightOffset + "px");

  $(".threshold-bar-msg").css("left", messageRightOffset + "px");
  $(".threshold-bar-msg-2").css("left", messageLeftOffset + "px");

  $(".threshold-bar").css("border", "2px solid blue");

  //* do nothing if the message is above the cat height threshold
  if (messageBottomOffset < catThreshold) return;

  //* if either left or right offset of the message is within the cat horizontal threshold range
  if (
    (messageRightOffset > catLeftOffset &&
      messageRightOffset < catRightOffset) ||
    (messageLeftOffset > catLeftOffset && messageLeftOffset < catRightOffset)
  ) {
    toggleCatFloorBlur(true);
    $(".threshold-bar").css("border", "2px solid red");
    return;
  }
}

function messageHoverOut(thisElement) {
  setTimeout(() => {
    $(thisElement).removeClass("hovered");
  }, 100);

  //todo check if current hover out is the blocking messages

  isBlocking ? toggleCatFloorBlur(true) : toggleCatFloorBlur(false);
  $(thisElement).css({
    "padding-block": $(thisElement).data("defaultPadding") + "px",
  });
}

$(document).ready(function () {});
