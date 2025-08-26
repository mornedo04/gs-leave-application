import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

import { Radio, Label } from "flowbite-react";

export default function LeaveData(props) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tLDeW, setTLDeW] = useState("");
  const [tLDiW, setTLDiW] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const workDayCalculator = async (sDate, eDate) => {
    let weekdayCounter = 1;
    let totalCounter = 1;
    // console.log(empLocation.includes("Shuweihat"));
    while (sDate < eDate) {
      // if (empLocation.includes("Shuweihat")) {
      //   if (sDate.format("ddd") !== "Sun") {
      //     weekdayCounter++; //add 1 to your counter if its not a weekend day
      //   }
      // } else
      //  {
      if (sDate.format("ddd") !== "Sat" && sDate.format("ddd") !== "Sun") {
        weekdayCounter++; //add 1 to your counter if its not a weekend day
      }
      // }
      totalCounter++;
      sDate = sDate.add(1, "days"); //increment by one day
    }

    return [weekdayCounter, totalCounter];
  };
  function handleDateChange(newValue) {
    setEndDate(newValue);
    if (startDate) {
      workDayCalculator(startDate, newValue).then((value) => {
        console.log("e and v: %d %d", value[0], value[1]);

        setTLDeW(value[0]);
        setTLDiW(value[1]);
      });

      // console.log('test: %d, %d', tLDeW, tLDiW)
      // console.log(workDayCalculator(startDate, newValue));
      // console.log('test: %d, %d', tLDeW, tLDiW)
    } else {
      console.log(startDate);
    }
  }

  function handleStartDateChange(value) {
    setStartDate(value);
    if (endDate) {
      workDayCalculator(value, endDate).then((value) => {
        console.log("e and v: %d %d", value[0], value[1]);

        setTLDeW(value[0]);
        setTLDiW(value[1]);
      });

      // console.log('test: %d, %d', tLDeW, tLDiW)
      // console.log(workDayCalculator(startDate, newValue));
      // console.log('test: %d, %d', tLDeW, tLDiW)
    } else {
      console.log("END DATE NULL %d", endDate);
    }
  }

  function checkStartDate(value) {}

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <h2 className="text-lg font-bold text-gray-200 ">
            B. Contact Address on Leave
          </h2>
          <input
            name="empHomeAddress"
            type="text"
            className="rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-2"
            placeholder="Home Country Address"
          />
          <input
            name="empHomeNumber"
            type="text"
            className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Contact Number Home Country"
          />
          <input
            name="empLocalNumber"
            type="text"
            value={props.empUAENum}
            className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="UAE Mobile Number +971 "
          />
        </section>

        {/* Request Leave Date */}
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <h2 className="text-lg font-bold text-gray-200 md:col-span-2">
            C. Request Leave
          </h2>
          <DatePicker
            className="text-gray-200 md:order-1"
            label="Leave Start Date"
            name="leave_start_date"
            format="DD-MMM-YYYY"
            value={startDate}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                required: true,
                size: "small",
              },
            }}
          />
          <DatePicker
            className="text-gray-200 md:order-3"
            label="Leave End Date"
            name="leave_end_date"
            format="DD-MMM-YYYY"
            value={endDate}
            minDate={startDate}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                required: true,
                size: "small",
              },
            }}
          />
          <DatePicker
            className="text-gray-200 md:order-2"
            label="Outgoing Travel Date"
            name="outgoing_travel_date"
            format="DD-MMM-YYYY"
            maxDate={endDate}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
          />
          <DatePicker
            className="text-gray-200 md:order-4"
            label="Incoming Travel Date"
            name="incoming_travel_date"
            format="DD-MMM-YYYY"
            minDate={startDate}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
          />
          <div className="flex md:order-5">
            <span className="inline-flex w-4/5 items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              <Label
                htmlFor="daycount1"
                value="Total No. of Leave Days Including weekends / holidays"
              />
            </span>
            <input
              type="text"
              name="totalDays"
              value={tLDiW}
              id="website-admin"
              className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Days"
              required
            />
          </div>

          <div className="flex md:order-6">
            <span className="inline-flex w-4/5 items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              <Label htmlFor="daycount2" value="" />
            </span>
            <input
              type="text"
              name="leaveDays"
              value="0"
              max={15}
              id="website-admin"
              className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Days"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 md:col-span-2 md:order-7">
            <span className="inline-flex items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              <Label
                htmlFor="remarks"
                value={
                  props.leaveTpe == "CML"
                    ? "Reason for Compensatory Leave"
                    : "Reason for Leave"
                }
              />
            </span>
            <input
              type="text"
              name="remarks"
              id="website-admin"
              className="block col-span-1 md:col-span-4 w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder=""
              onInvalid={(F) =>
                F.target.setCustomValidity(
                  "Please give the Date and Reason of the Compensatory Leave"
                )
              }
              onInput={(F) => F.target.setCustomValidity("")}
              required={props.leaveTpe == "CML" ? true : false}
            />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-4 gap-4  md:order-7">
          <h2 className="col-span-4 text-lg font-bold text-gray-200">
            D. Flight Booking
          </h2>
          <Label className="" value="BOOKING TO BE MADE BY:" />
          <div className="flex items-center gap-2">
            <Radio required name="flight_booking" value="LOCAL" />
            <Label htmlFor="flightCompany" value="LOCAL LEAVE" />
          </div>
          <div className="flex items-center gap-2">
            <Radio required name="flight_booking" value="COMPANY" />
            <Label htmlFor="flightCompany" value="COMPANY" />
          </div>

          <div className="flex items-center gap-2">
            <Radio required name="flight_booking" value="OWN" />
            <Label htmlFor="flightOwn" value="OWN" />
          </div>

          <div></div>
          <Label className="" value="Date" />
          <Label className="" value="Airline" />
          <Label className="" value="Sector" />
          <Label className="col-span-4 md:col-span-1" value="Departure" />
          <DatePicker
            className="col-span-2 md:col-span-1"
            name="ticket_departure_date"
            format="DD-MMM-YYYY"
            maxDate={endDate}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
          />
          <input
            type="text"
            name="departure_airline"
            className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
          <input
            type="text"
            name="departure_sector"
            className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
          <Label className="col-span-4 md:col-span-1" value="Return" />
          <DatePicker
            className="col-span-2 md:col-span-1"
            name="ticket_arrival_date"
            format="DD-MMM-YYYY"
            minDate={startDate}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
          />
          <input
            type="text"
            name="arrival_airline"
            className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
          <input
            type="text"
            name="arrival_sector"
            className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </section>

        <button
          type="submit"
          className="col-span-2 mt-4 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-indigo-600 hover:to-blue-600"
          disabled={props.isDisabled}
        >
          {props.isDisabled ? "Done!" : "Download Form"}
        </button>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
