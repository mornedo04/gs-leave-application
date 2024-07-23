import logo from './logo.svg';
import './App.css';
import { Radio, Datepicker, Flowbite, Label } from "flowbite-react";


function App() {
  return (
    <Flowbite theme={{ mode: "dark" }}>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="w-full max-w-5xl rounded-lg bg-gray-800 p-6 shadow-md">
          <form className="">
            <h2 className="text-center text-lg font-bold text-gray-200">
              HR & Administration Department
            </h2>
            <h2 className="text-center text-lg font-bold text-gray-200">
              Leave Application Form
            </h2>

            {/* Leave Request Information */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <h2 className="text-lg font-bold text-gray-200 md:col-span-2">
                A. Leave Request Information
              </h2>
              <input
                type="text"
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Full Name"
              />
              <input
                type="text"
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Employee Number"
              />
              <input
                type="text"
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Job Title"
              />
              <input
                type="text"
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Date of Joining"
              />
              <input
                type="text"
                className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Project / Location"
              />
              <input
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
                type="text"
                className="rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-2"
                placeholder="Home Country Address"
              />
              <input
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Contact Number Home Country"
              />
              <input
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="UAE Mobile Number +971 "
              />
            </section>

            {/* Request Leave Date */}
            <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <h2 className="text-lg font-bold text-gray-200 md:col-span-2">
                C. Request Leave
              </h2>
              <div className="text-gray-200">
                <Label htmlFor="date1" value="Leave Start Date" />
                <Datepicker
                  name="leave-start-date"
                />
              </div>
              <div className="text-gray-200">
                <Label htmlFor="date2" value="Leave End Date" />
                <Datepicker
                  className="w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Test"
                  name="leave-end-date"
                />
              </div>
              <div className="text-gray-200">
                <Label htmlFor="date3" value="Outgoing Travel Date" />
                <Datepicker
                  className="w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Test"
                  name="outgoing-travel-date"
                />
              </div>
              <div className="text-gray-200">
                <Label htmlFor="date4" value="Incoming Travel Date" />
                <Datepicker
                  className="w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Test"
                  name="incoming-travel-date"
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
                  id="website-admin"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Days"
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
                  id="website-admin"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Days"
                />
              </div>
            </section>

            <section className="mt-6 grid grid-cols-4 gap-4">
              <h2 className="col-span-4 text-lg font-bold text-gray-200">
                D. Flight Booking
              </h2>
              <Label className="col-span-2" value="BOOKING TO BE MADE BY:" />
              <div className="flex items-center gap-2">
                <Radio name="fling-booking" value="COMPANY" />
                <Label htmlFor="flightCompany" value="COMPANY" />
              </div>

              <div className="flex items-center gap-2">
                <Radio name="fling-booking" value="OWN" />
                <Label htmlFor="flightOwn" value="OWN" />
              </div>

              <div></div>
              <Label className="" value="Date" />
              <Label className="" value="Airline" />
              <Label className="" value="Sector" />
              <Label className="col-span-4 md:col-span-1" value="Departure" />
              <Datepicker
                className="col-span-2 w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-1"
                name="ticket-start-date"
              />
              <input
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder=""
              />
              <input
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder=""
              />
              <Label className="col-span-4 md:col-span-1" value="Return" />
              <Datepicker
                className="col-span-2 w-full bg-gray-700 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-1"
                name="ticket-start-date"
              />
              <input
                type="text"
                className="col-span-1 rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder=""
              />
              <input
                type="text"
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
        {/* <h1 className="text-2xl dark:text-white">
        Flowbite React + Create React App
      </h1>
      */}
      </main>
    </Flowbite>
  );
}

export default App;
