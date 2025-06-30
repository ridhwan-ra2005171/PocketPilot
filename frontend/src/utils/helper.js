export const validateEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";
  //first letters of each name part.
  //[0] -> Joe -> .charAt(0); gets the J
  //[1] -> Doe -> .charAt(0); gets the D
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0);
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (number) => {
  if (number == null || isNaN(Number(number))) return "";

  const [integerPart, fractionalPart] = number.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
