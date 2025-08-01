import moment from "moment";

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

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
    month: moment(item?.date).format("Do MMM"),
  }));

  return chartData;
};

// export const prepareIncomeBarChartData = (data = []) => {
//   const sortedData = [...data].sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   const chartData = sortedData.map((item) => ({
//     month: moment(item?.date).format("Do MMM"),
//     source: item?.source,
//     amount: item?.amount,
//   }));

//   return chartData;
// };

export const prepareIncomeBarChartData = (data = []) => {
  // Group amounts by date
  const grouped = data.reduce((acc, item) => {
    const dateKey = moment(item.date).format("YYYY-MM-DD"); // normalize date key
    if (!acc[dateKey]) {
      acc[dateKey] = { date: item.date, amount: 0 };
    }
    acc[dateKey].amount += item.amount;
    return acc;
  }, {});

  // Convert grouped data to an array and sort it
  const sortedData = Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Map to chart format
  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: item.amount,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  // Group amounts by date
  const grouped = data.reduce((acc, item) => {
    const dateKey = moment(item.date).format("YYYY-MM-DD"); // normalize date key
    if (!acc[dateKey]) {
      acc[dateKey] = { date: item.date, amount: 0 };
    }
    acc[dateKey].amount += item.amount;
    return acc;
  }, {});

  // Convert grouped data to array and sort
  const sortedData = Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Map to chart format
  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: item.amount,
  }));

  return chartData;
};

//TODO: add more later
export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "QAR":
      return "﷼";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "CAD":
      return "$";
    case "AUD":
      return "$";
    case "INR":
      return "₹";
    default:
      return "$";
  }
};
