import getCatOffset from "./cat_offset.js";

export default function travelGetMiddleMessagesList(
  catOffsets,
  messages,
  middleIndex,
  direction,
) {
  let messagesList = [];

  if (direction === "right") {
    while (
      messages[middleIndex].getBoundingClientRect().right >
      catOffsets.catLeftOffset
    ) {
      messages[middleIndex].style.border = "1px solid red";
      messagesList.push(messages[middleIndex]);
      middleIndex++;

      document.querySelector(".threshold-bar-y-3").style.left =
        messages[middleIndex].getBoundingClientRect().right + "px";
    }

    //* we return an array of ranges of middle messages near the cat (left to right order of the messages)
    //* note: right to left of the array --> 0 to last element of the array
  } else if (direction === "left") {
    while (
      messages[middleIndex].getBoundingClientRect().left <
      catOffsets.catRightOffset
    ) {
      messages[middleIndex].style.border = "1px solid green";
      messagesList.push(messages[middleIndex]);
      middleIndex--;
    }
  } else {
    messagesList.push(messages[middleIndex - 1]);
    messagesList.push(messages[middleIndex]);
    messagesList.push(messages[middleIndex + 1]);
  }

  //* we return an array of ranges of middle messages near the cat (left to right order of the messages)
  return messagesList;
}
