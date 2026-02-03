// //! for debug only
// let finalBottomOffset = 0;
// while (counter > 0) {
//   var color = direction === "right" ? "skyblue" : "green";

//   //! debug message border
//   // messages[middleIndex].style.border = "solid 2px " + color;

//   var msgRightOffset = messages[middleIndex].getBoundingClientRect().right;

//   msgRightOffset =
//     direction === "right"
//       ? msgRightOffset - scrollDistance
//       : msgRightOffset + scrollDistance;

//   var msgMiddleOffset =
//     msgRightOffset - messages[middleIndex].offsetWidth / 2;

//   const msgLeftOffset =
//     direction === "right"
//       ? messages[middleIndex].getBoundingClientRect().left - scrollDistance
//       : messages[middleIndex].getBoundingClientRect().left + scrollDistance;

//   const msgBottomOffset =
//     parseFloat(
//       window
//         .getComputedStyle(messages[middleIndex].closest(".message"))
//         .getPropertyValue("top"),
//     ) +
//     messages[middleIndex].querySelector(".hover-message").offsetHeight +
//     parseFloat(
//       window
//         .getComputedStyle(document.querySelector(".banner__graphics"))
//         .getPropertyValue("padding-top"),
//     );

//   //*
//   if (
//     (msgLeftOffset > catLeftOffset && msgLeftOffset < catRightOffset) ||
//     (msgRightOffset > catLeftOffset && msgRightOffset < catRightOffset) ||
//     (msgMiddleOffset > catLeftOffset && msgMiddleOffset < catRightOffset)
//   ) {
//     //! debug message border
//     // messages[middleIndex].style.border = "solid 2px pink";
//     tempMiddleIndex = middleIndex;
//     // console.log("msgBottomOffset ====> ", msgBottomOffset);
//     // console.log("catThreshold ====> ", catThreshold);

//     if (msgBottomOffset > catThreshold) {
//       //! debug message border
//       // messages[middleIndex].style.border = "solid 2px red";
//       // document.querySelector(".threshold-bar-msg-mid").style.border =
//       //   "solid red 1px";

//       // console.log("BLOCKED IN THE WAY ======!! ");

//       setCurrentMiddleIndex(middleIndex);
//       toBlur = true;

//       finalBottomOffset = msgBottomOffset;

//       break;
//     }
//   }

//   if (
//     direction === "right" &&
//     msgLeftOffset > catLeftOffset &&
//     msgRightOffset > catLeftOffset
//   ) {
//     break;
//   }

//   if (
//     direction === "left" &&
//     msgLeftOffset < catRightOffset &&
//     msgRightOffset < catRightOffset
//   ) {
//     break;
//   }

//   //* if no messages are blocking the cat, assign latest in range middle index to the current middle index

//   //* traverse up and down
//   direction === "right" ? middleIndex-- : middleIndex++;

//   //* amount of elements to traverse, count down
//   counter--;
// }

// if (!toBlur || getCurrentMiddleIndex() === "no element")
//   setCurrentMiddleIndex(tempMiddleIndex);

// console.log(
//   "currentMiddleIndex : : : " +
//     document.querySelectorAll(".message p")[getCurrentMiddleIndex()]
//       .textContent,
// );

// // console.log("cat threshold ====> ", catThreshold);

// // console.log("finalBottomOffset ====> ", finalBottomOffset);

// isBlocking = toBlur;
// toggleCatFloorBlur(toBlur);
