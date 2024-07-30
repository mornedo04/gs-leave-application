// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Radio, Datepicker, Flowbite, Label } from "flowbite-react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from "file-saver";
import expressionParser from "docxtemplater/expressions";


import gsLogo from "./images/gs-inima-Transparent.png";

function App() {
  const [options, setOptions] = useState([]);
    const [employeeList, setEmployeeList] = useState({});
    const [empID, setEmpID] = useState("");
    const [empJobTitle, setEmpJobTitle] = useState("");
    const [empDOJ, setEmpDOJ] = useState("");
    const [empLocation, setEmpLocation] = useState("");
      const [subData, setSubData] = useState({});
  
    useEffect(() => {
      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/18YH_yqURS0HweGXsMqNDD7MLG3k3iCBHjRVU0YQoGbE/values/Sheet1?key=AIzaSyAAWbrLACiAaQJLFbmApP-1zqrVe9zA3Ug"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data["values"]);
          const results = [];
          const dicResult = {};
          data["values"].forEach((value) => {
            if (value[1] !== "Emp Name") {
              results.push({
                key: value[1],
                value: value[0],
              });
              dicResult[value[0]] = [value[3], value[2], value[9]];
            }
          });
          setOptions([{ key: "Employee Name", value: "" }, ...results]);
          setEmployeeList(dicResult);
          // setPhotos(data);
        });
    }, []);
  
    function loadFile(url, callback) {
      PizZipUtils.getBinaryContent(url, callback);
    }
  
  
    function handleChange(e) {
      // console.log(employeeList["S400069-EX"])
      setEmpID(e.target.value);
  
      setEmpJobTitle(employeeList[e.target.value][0]);
      setEmpDOJ(employeeList[e.target.value][1]);
      setEmpLocation(employeeList[e.target.value][2]);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      const countriesRet = event.target.countries.value;
      console.log(countriesRet)
      loadFile(
        "https://lionfish-app-zi2iv.ondigitalocean.app/doc/template.docx",
        function (error, content) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            parser: expressionParser,
          });
          doc.render({
            AL: countriesRet === "AL" ? "X" : "",
            SL: countriesRet === "SL" ? "X" : "",
            RL: countriesRet === "RL" ? "X" : "",
            EL: countriesRet === "EL" ? "X" : "",
            PL: countriesRet === "PL" ? "X" : "",
            CL: countriesRet === "CL" ? "X" : "",
            name: event.target.empName.value,
            emp_no: event.target.empID.value,
            job_title: event.target.empJobTitle.value,
            doj: event.target.empDOJ.value,
            location: event.target.empLocation.value,
            expiration: "",
            address: event.target.empHomeAddress.value,
            uae_contact: event.target.empLocalNumber.value,
            home_contact: event.target.empHomeNumber.value,
            start_date: event.target.leave_start_date.value,
            end_date: event.target.leave_end_date.value,
            outgoing_date: event.target.outgoing_travel_date.value,
            incoming_date: event.target.incoming_travel_date.value,
            ex_day: event.target.leaveDays.value,
            in_day: event.target.totalDays.value,
            comp: event.target.flight_booking.value === "COMPANY" ? "X" : "",
            own: event.target.flight_booking.value === "OWN" ? "X" : "",
            dep_date: event.target.ticket_departure_date.value,
            dep_airline: event.target.departure_airline.value,
            dep_sector: event.target.departure_sector.value,
            ret_date: event.target.ticket_arrival_date.value,
            ret_airline: event.target.arrival_airline.value,
            ret_sector: event.target.arrival_sector.value,
          });
  
          const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          }); //Output the document using Data-URI
          saveAs(out, empID.concat("output.docx"));
        }
      );
    }

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <main className="flex flex-col min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <img src={gsLogo} className="h-20" alt="GS Inima LOGO" />
        <h2 className="text-center text-lg font-bold text-gray-200">
          HR & Administration Department
        </h2>
        <h2 className="text-center text-lg font-bold text-gray-200">
          Leave Application Form
        </h2>
        <div className="w-full max-w-5xl rounded-lg bg-gray-800 p-6 shadow-md">
          <form className="" onSubmit={handleSubmit} method="post">
            {/* Leave Request Information */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <h2 className="text-lg font-bold text-gray-200 md:col-span-2">
                A. Leave Request Information
              </h2>
              <div className="md:col-span-2">
                <select
                  id="countries"
                  name="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Leave Type</option>
                  <option value="AL">Annual Leave</option>
                  <option value="SL">Sick Leave</option>
                  <option value="RL">Rotation Leave</option>
                  <option value="EL">Emergency Leave</option>
                  <option value="PL">Paternity Leave</option>
                  <option value="CL">Compassionate Leave</option>
                </select>
              </div>

              <select
                onChange={handleChange}
                name="empName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {options.map((option) => {
                  return <option value={option.value}>{option.key}</option>;
                })}
              </select>
              <input
                type="text"
                name="empID"
                value={empID}
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Employee Number"
              />
              <input
                type="text"
                name="empJobTitle"
                value={empJobTitle}
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Job Title"
              />
              <input
                type="text"
                name="empDOJ"
                value={empDOJ}
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Date of Joining"
              />
              <input
                type="text"
                name="empLocation"
                value={empLocation}
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Project / Location"
              />
              <input
                name="visaExpiration"
                type="text"
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Visa Expiration"
              />
            </section>

            {/* Contact Address on Leave */}
            <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <h2 className="text-lg font-bold text-gray-200 ">
                B. Contact Address on Leave
              </h2>
              <input
                name="empHomeAddress"
                type="text"
                className="rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-2"
                placeholder="Home Country Address"
                required
              />
              <input
                name="empHomeNumber"
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Contact Number Home Country"
                required
              />
              <input
                name="empLocalNumber"
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="UAE Mobile Number +971 "
                required
              />
            </section>

            {/* Request Leave Date */}
            <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <h2 className="text-lg font-bold text-gray-200 md:col-span-2">
                C. Request Leave
              </h2>
              <div className="text-gray-200">
                <Label htmlFor="date1" value="Leave Start Date" />
                <Datepicker name="leave_start_date" />
              </div>
              <div className="text-gray-200">
                <Label htmlFor="date2" value="Leave End Date" />
                <Datepicker
                  className="w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Test"
                  name="leave_end_date"
                />
              </div>
              <div className="text-gray-200">
                <Label htmlFor="date3" value="Outgoing Travel Date" />
                <Datepicker
                  className="w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Test"
                  name="outgoing_travel_date"
                />
              </div>
              <div className="text-gray-200">
                <Label htmlFor="date4" value="Incoming Travel Date" />
                <Datepicker
                  className="w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Test"
                  name="incoming_travel_date"
                />
              </div>
              <div className="flex">
                <span className="inline-flex w-4/5 items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="daycount1"
                    value="Total No. of Leave Days Excluding weekends / holidays"
                  />
                </span>
                <input
                  type="text"
                  name="leaveDays"
                  id="website-admin"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Days"
                  required
                />
              </div>

              <div className="flex">
                <span className="inline-flex w-4/5 items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="daycount2"
                    value="Total No. of Leave Days Including weekends / holidays"
                  />
                </span>
                <input
                  type="text"
                  name="totalDays"
                  id="website-admin"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Days"
                  required
                />
              </div>
            </section>

            <section className="mt-6 grid grid-cols-4 gap-4">
              <h2 className="col-span-4 text-lg font-bold text-gray-200">
                D. Flight Booking
              </h2>
              <Label className="col-span-2" value="BOOKING TO BE MADE BY:" />
              <div className="flex items-center gap-2">
                <Radio name="flight_booking" value="COMPANY" required />
                <Label htmlFor="flightCompany" value="COMPANY" />
              </div>

              <div className="flex items-center gap-2">
                <Radio name="flight_booking" value="OWN" required />
                <Label htmlFor="flightOwn" value="OWN" />
              </div>

              <div></div>
              <Label className="" value="Date" />
              <Label className="" value="Airline" />
              <Label className="" value="Sector" />
              <Label className="col-span-4 md:col-span-1" value="Departure" />
              <Datepicker
                className="col-span-2 w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-1"
                name="ticket_departure_date"
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
              <Datepicker
                className="col-span-2 w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-1"
                name="ticket_arrival_date"
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
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </Flowbite>
  );
}

export default App;
