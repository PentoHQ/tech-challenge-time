import moment from "moment";

export const formatTimeStamp = (date) =>
  moment(date).format("MMMM Do YYYY, HH:mm");
