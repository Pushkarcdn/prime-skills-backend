export const secondsAgo = (createdAt) => {
  // Parse the createdAt string into a Date object
  const createdAtDate = new Date(createdAt);

  // Get the current time as a Date object
  const currentTime = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentTime - createdAtDate;

  // Convert milliseconds to seconds
  const secondsAgo = Math.floor(timeDifference / 1000);

  return secondsAgo;
};

// function to convert jwt time into seconds
export const convertJwtTimeToSeconds = (expiry) => {
  let seconds = 0;

  if (expiry.includes("s")) {
    seconds = parseInt(expiry.replace("s", ""));
  } else if (expiry.includes("m")) {
    seconds = parseInt(expiry.replace("m", "")) * 60;
  } else if (expiry.includes("h")) {
    seconds = parseInt(expiry.replace("h", "")) * 60 * 60;
  } else if (expiry.includes("d")) {
    seconds = parseInt(expiry.replace("d", "")) * 24 * 60 * 60;
  } else if (expiry.includes("w")) {
    seconds = parseInt(expiry.replace("w", "")) * 7 * 24 * 60 * 60;
  } else {
    seconds = expiry;
  }

  return seconds;
};
