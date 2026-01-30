import getCatOffset from "./cat_offset.js";

export default function getMiddleMessages(middleMessageIndex) {
  const elements = document.querySelectorAll(".message");
  const middleMessage = elements[middleMessageIndex];

  const { catLeftOffset, catRightOffset, catTopOffset } =
    getCatOffset(".light-cat");

  console.log(
    "middleMessage.getBoundingClientRect().right: " +
      middleMessage.getBoundingClientRect().right,
  );

  let counter = middleMessageIndex;
  let middleMessages = [];
  //* if the left edge of the middle message is at position to the left edge of the cat
  //* travel and select few messages to the left (close to the cat)
  if (middleMessage.getBoundingClientRect().left > catLeftOffset) {
    while (elements[counter].getBoundingClientRect().right > catLeftOffset) {
      elements[counter].style.border = "1px solid red";
      middleMessages.push(elements[counter]);
      counter++;

      document.querySelector(".threshold-bar-y-3").style.left =
        elements[counter].getBoundingClientRect().right + "px";
    }

    //* we return an array of ranges of middle messages near the cat (left to right order of the messages)
    //* note: right to left of the array --> 0 to last element of the array
    return middleMessages;
  }
  //* if the right edge of the middle message is at position to the right edge of the cat
  //* travel and select few messages to the right (close to the cat)
  else if (middleMessage.getBoundingClientRect().right < catRightOffset) {
    while (elements[counter].getBoundingClientRect().left < catRightOffset) {
      elements[counter].style.border = "1px solid green";
      middleMessages.push(elements[counter]);
      counter--;
    }
    //* we return an array of ranges of middle messages near the cat (left to right order of the messages)
    return middleMessages;
  } else {
    //todo: what if left and right edge of the middle message is outside the left and right edge of the cat?
    //todo: AKA: what if the message is right in the middle above the cat?
    alert("We found it!! Middle message is in the middle above the cat!!");
    middleMessages.push(elements[middleMessageIndex - 1]);
    middleMessages.push(elements[middleMessageIndex]);
    middleMessages.push(elements[middleMessageIndex + 1]);

    return middleMessages;
  }

  //   while (middleMessage.getBoundingClientRect().left < catLeftOffset) {
  //     counter++;
  //     elements[counter].style.border = "1px solid red";
  //   }
}
