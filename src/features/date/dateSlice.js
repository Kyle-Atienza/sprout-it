import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  dates: [],
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    getDatesInRange: (startDate, endDate, range) => {
      let date;
      let interval;
      let groups;
      let end;

      if (range === "days") {
        date = new Date(startDate.getTime());
        interval = 1;
        groups = 15;
        end = new Date(endDate.setDate(endDate.getDate() + 1));
      } else if (range === "weeks") {
        const day = new Date(startDate).getDay();
        const diff = new Date(startDate).getDate() - day + (day === 0 ? -6 : 1);

        date = new Date(new Date(startDate).setDate(diff));
        interval = 7;
        groups = 8;
        end = new Date(endDate.setDate(endDate.getDate() + 7));
      } else if (range === "months") {
        date = new Date(
          new Date(startDate).getFullYear(),
          new Date(startDate).getMonth(),
          1
        );
        groups = 12;
        end = new Date(endDate.setMonth(endDate.getMonth() + 1));
      }

      const dates = [];

      if (range === "days") {
        while (date <= end) {
          dates.push(
            new Date(date).toDateString().slice(4).replaceAll(" ", "-")
          );
          date.setDate(date.getDate() + interval);
        }

        return _.chunk(dates, groups).reverse();
      } else if (range === "weeks") {
        while (date <= end) {
          dates.push(
            new Date(date).toDateString().slice(4).replaceAll(" ", "-")
          );
          date.setDate(date.getDate() + interval);
        }

        return _.chunk(dates.reverse(), groups).map((week) => week.reverse());
      } else if (range === "months") {
        while (date <= end) {
          dates.push(
            new Date(date).toDateString().slice(4).replaceAll(" ", "-")
          );
          date.setMonth(date.getMonth() + 1);
        }

        return _.chunk(dates.reverse(), groups).map((months) =>
          months.reverse()
        );
      }
    },
  },
});
