import * as dayjs from "dayjs";

const extractShortAddress = (obj, noHouseNumber = false) => {
  let strArr = [];
  if (obj.street && obj.street !== "null") strArr.push(obj.street + ",");
  if (!noHouseNumber && obj.house_number && obj.house_number !== "null")
    strArr.push(obj.house_number);
  if (obj.city && obj.city !== "null") strArr.push(obj.city);
  if (obj.district && obj.district !== "null") strArr.push(`(${obj.district})`);
  if (strArr.length === 0) strArr.push(obj.county);
  return strArr.join(" ");
};

const shortTitle = (obj) => {
  return (
    extractShortAddress(obj.location, true) +
    ", " +
    dayjs(obj.date).format("DD.MM.YYYY")
  );
};

export { extractShortAddress, shortTitle };
