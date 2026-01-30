// //* if there are odd number of messages, check for middle, left and right
// if (elements.length % 2 == 1) {
//   midIndex += 1;

//   var midOffset =
//     elements[midIndex].offsetHeight +
//     elements[midIndex].getBoundingClientRect().top;

//   var midLeftOffset =
//     elements[midLeft].offsetHeight + $(elements[midLeft]).offset().top;

//   var midRightOffset =
//     elements[midRight].offsetHeight +
//     elements[midRight].getBoundingClientRect().top;

//   // console.log(elements);s
//   // console.log("Message length: " + $(elements[midIndex]).css("height"));

//   // console.log("current offset middle: " + midOffset);
//   // console.log("current offset left: " + midLeftOffset);
//   // console.log("current offset right: " + midRightOffset);

//   let counter = 0;
//   // * check for middle
//   let middleSolved = false;
//   while (
//     midLeftOffset > catHeightThreshold ||
//     midRightOffset > catHeightThreshold ||
//     midOffset > catHeightThreshold
//   ) {
//     elements = document.querySelectorAll(".message");
//     midLeftOffset =
//       elements[midLeft].offsetHeight +
//       elements[midLeft].getBoundingClientRect().top;

//     midRightOffset =
//       elements[midRight].offsetHeight +
//       elements[midRight].getBoundingClientRect().top;

//     midOffset =
//       elements[midIndex].offsetHeight +
//       elements[midIndex].getBoundingClientRect().top;

//     if (midOffset > catHeightThreshold) {
//       console.log("TOO HIGH offset middle: " + midLeftOffset);
//       // $(elements[midIndex]).css("border", "1px solid red");
//       swapElements(elements[counter], elements[midIndex]);

//       counter += 1;
//       console.log("counter: :: " + counter);
//     }

//     //* if long message is in the middle right
//     if (midRightOffset > catHeightThreshold) {
//       // $(elements[midRight]).css("border", "1px solid goldenrod");
//       swapElements(elements[counter], elements[midRight]);
//       counter += 1;
//     }

//     //* if long message is in the middle left
//     if (midLeftOffset > catHeightThreshold) {
//       console.log("TOO HIGH offset left: " + midLeftOffset);
//       // $(elements[midLeft]).css("border", "1px solid green");
//       swapElements(elements[midLeft], elements[counter]);
//       counter += 1;
//       console.log("counter: :: " + counter);
//     }

//     // if (maxTries > 0) {
//     //   console.log("!! MAX TRIES FINISHED!! ");
//     //   break;
//     // }

//     if (counter >= $(".message").length) break;

//     console.log("\n\n");
//   }
//   // elements = $(".message");
//   // $("#the__one").swapElements($(elements[midIndex]));
//   //! debug use
//   elements = document.querySelectorAll(".message");

//   midLeftOffset =
//     elements[midLeft].offsetHeight +
//     elements[midLeft].getBoundingClientRect().top;

//   midRightOffset =
//     elements[midRight].offsetHeight +
//     elements[midRight].getBoundingClientRect().top;

//   midOffset =
//     elements[midIndex].offsetHeight +
//     elements[midIndex].getBoundingClientRect().top;

//   console.log("----> AFTER offset middle: " + midOffset);
//   console.log("----> AAFTER offset left: " + midLeftOffset);
//   console.log("----> AFTER offset right: " + midRightOffset);

//   //! debug border message
//   // elements[midLeft].style.border = "1px solid var(--hero-white)";
//   // elements[midRight].style.border = "1px solid var(--hero-white)";
//   // elements[midIndex].style.border = "1px solid var(--hero-white)";
// } else {
//   //* if there are even number of messages, check for left and right
//   midLeft = midIndex;
//   midRight = midIndex + 1;

//   // console.log("midLeft  " + midLeft);
//   // console.log("midRight  " + midRight);

//   var midLeftOffset =
//     elements[midLeft].offsetHeight +
//     elements[midLeft].getBoundingClientRect().top;

//   var midRightOffset =
//     elements[midRight].offsetHeight +
//     elements[midRight].getBoundingClientRect().top;

//   // console.log("THRESHOLD " + catHeightThreshold);
//   // console.log("$(elements[midLeft]).offset() " + midLeftOffset);
//   // console.log("$(elements[midRight]).offset() " + midRightOffset);

//   var counter = 0;
//   // //* check for right and left, make sure no long ass messages are in the middle
//   while (
//     midRightOffset > catHeightThreshold ||
//     midLeftOffset > catHeightThreshold
//   ) {
//     elements = document.querySelectorAll(".message");
//     midLeftOffset =
//       elements[midLeft].offsetHeight +
//       elements[midLeft].getBoundingClientRect().top;

//     midRightOffset =
//       elements[midRight].offsetHeight +
//       elements[midRight].getBoundingClientRect().top;

//     //* if long message is in the middle right
//     if (midRightOffset > catHeightThreshold) {
//       console.log("TOO HIGHH offset right: " + midRightOffset);
//       // $(elements[midRight]).css("border", "1px solid skyblue");
//       swapElements(elements[midRight], elements[counter]);
//       counter += 1;
//     }

//     //* if long message is in the middle left
//     if (midLeftOffset > catHeightThreshold) {
//       console.log("TOO HIGHHHH offset left: " + midLeftOffset);
//       // $(elements[midLeft]).css("border", "1px solid purple");
//       swapElements(elements[midLeft], elements[counter]);
//       counter += 1;
//     }

//     if (counter >= elements.length) break;

//     // elements = $(".message");
//     // $("#the__one").swapElements($(elements[midRight]));
//   }

//   // $(elements[midLeft]).css("border", "1px solid magenta");
//   // $(elements[midRight]).css("border", "1px solid skyblue");

//   //! debug border message
//   // elements[midLeft].style.border = "solid white 1px";
//   // elements[midRight].style.border = "solid white 1px";

//   midLeftOffset =
//     elements[midLeft].offsetHeight +
//     elements[midLeft].getBoundingClientRect().top;

//   midRightOffset =
//     elements[midRight].offsetHeight +
//     elements[midRight].getBoundingClientRect().top;
// }
