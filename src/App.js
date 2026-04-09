// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Flowbite } from "flowbite-react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Login from "./components/login";

// import Moment from "moment";

// import Docxtemplater from "docxtemplater";
// import PizZip from "pizzip";
// import PizZipUtils from "pizzip/utils/index.js";
// import { saveAs } from "file-saver";
// import expressionParser from "docxtemplater/expressions";
import LeaveForm from "./LeaveFormPage";

import gsLogo from "./images/gs-inima-Transparent.png";

import LeaveData from "./components/LeaveData";

function App() {
  // const containerRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(false);
  const [options, setOptions] = useState([]);
  const [hideData, setHideData] = useState(true);
  const [employeeList, setEmployeeList] = useState({});
  const [leaveTpe, setLeaveType] = useState();
  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");
  const [empJobTitle, setEmpJobTitle] = useState("");
  const [empDOJ, setEmpDOJ] = useState("");
  const [empLocation, setEmpLocation] = useState("");
  const [empUAENum, setEmpUAENum] = useState("");
  const [seed, setSeed] = useState(1);
  // const [docBlob, setDocBlob] = useState(null);
  const [subProps, setSubProps] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const reset = () => {
    setSeed(Math.random());
  };



  useEffect(() => {
    fetch(
      `https://script.googleusercontent.com/a/macros/inima.com/echo?user_content_key=${process.env.GOOGLE_SHEET_API}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const results = [];
        const dicResult = {};
        data.forEach((value) => {
          if (value[1] !== "Emp Name") {
            results.push({
              key: value["name"],
              value: value["id"],
            });
            dicResult[value["id"]] = [
              value["name"],
              value["position"],
              value["doj"],
              "Shuweihat Abu Dhabi",
              value["number"],
            ];
          }
        });
        setOptions([{ key: "Employee Name", value: "" }, ...results]);
        setEmployeeList(dicResult);
        setIsLoading(false);
        // setPhotos(data);
      });
  }, []);

  // function loadFile(url, callback) {
  //   PizZipUtils.getBinaryContent(url, callback);
  // }

  const handleChange = async (e) => {
    // console.log(employeeList["S400069-EX"])
    reset();
    if (leaveTpe) setHideData(false);
    setEmpID(e.target.value);
    setEmpName(employeeList[e.target.value][0]);
    setEmpJobTitle(employeeList[e.target.value][1]);
    setEmpDOJ(employeeList[e.target.value][2]);
    setEmpLocation(employeeList[e.target.value][3]);
    setEmpUAENum(employeeList[e.target.value][4]);
  };

  const handleLeaveType = async (e) => {
    setLeaveType(e.target.value);
    reset();
    if (empID) setHideData(false);
  };

  function handleSubmit(event) {
    setIsDisabled(true);
    const countriesRet = event.target.countries.value;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // https://script.google.com/macros/s/AKfycbzKb4MRo_GoD9ZUBurUtf23z-bJSayh1gII9wW1d2LzsWx_rMzqODsjaIMMa2BH3LQQ/exec
    const url =
      `https://script.google.com/macros/s/${process.env.GOOGLE_APP_SCRIPT}/exec`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `date=${new Date()}&emp_no=${
        event.target.empID.value
      }&name=${empName}&start_date=${
        event.target.leave_start_date.value
      }&end_date=${
        event.target.leave_end_date.value
      }&type=${countriesRet}&ticketBooking=${
        event.target.flight_booking.value
      }`,
      //   }).then(res=>res.text()).then(data=>{
      //     alert(data)
      //   }).catch(error=>console.log(error))
    })
      .then((res) => console.log(`Sheet response ${res.text}`))
      .catch((error) => console.log(`Sheet Error: ${error}`));

    setSubProps({
      leaveType: countriesRet,
      name: empName,
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
      remarks: event.target.remarks.value,
      ticketBooking: event.target.flight_booking.value,
      dep_date: event.target.ticket_departure_date.value,
      dep_airline: event.target.departure_airline.value,
      dep_sector: event.target.departure_sector.value,
      ret_date: event.target.ticket_arrival_date.value,
      ret_airline: event.target.arrival_airline.value,
      ret_sector: event.target.arrival_sector.value,
    });
    setIsSubmitted(true);
    // }

    // event.preventDefault();
    // loadFile(
    //   `${process.env.PUBLIC_URL}/doc/template.docx`,
    //   // "http://localhost:3000/doc/template.docx",
    //   function (error, content) {

    //     setIsDisabled(true);

    //     if (error) {
    //       throw error;
    //     }
    //     const zip = new PizZip(content);
    //     const doc = new Docxtemplater(zip, {
    //       paragraphLoop: true,
    //       linebreaks: true,
    //       parser: expressionParser,
    //     });
    //     doc.render({
    //       AL: countriesRet === "AL" ? "X" : "",
    //       SL: countriesRet === "SL" ? "X" : "",
    //       RL: countriesRet === "RL" ? "X" : "",
    //       EL: countriesRet === "EL" ? "X" : "",
    //       PL: countriesRet === "PL" ? "X" : "",
    //       CL: countriesRet === "CL" ? "X" : "",
    //       name: empName,
    //       emp_no: event.target.empID.value,
    //       job_title: event.target.empJobTitle.value,
    //       doj: event.target.empDOJ.value,
    //       location: event.target.empLocation.value,
    //       expiration: "",
    //       address: event.target.empHomeAddress.value,
    //       uae_contact: event.target.empLocalNumber.value,
    //       home_contact: event.target.empHomeNumber.value,
    //       start_date: event.target.leave_start_date.value,
    //       end_date: event.target.leave_end_date.value,
    //       outgoing_date: event.target.outgoing_travel_date.value,
    //       incoming_date: event.target.incoming_travel_date.value,
    //       ex_day: event.target.leaveDays.value,
    //       in_day: event.target.totalDays.value,
    //       remarks: event.target.remarks.value,
    //       a: event.target.flight_booking.value === "COMPANY" ? "X" : "",
    //       b: event.target.flight_booking.value === "OWN" ? "X" : "",
    //       dep_date: event.target.ticket_departure_date.value,
    //       dep_airline: event.target.departure_airline.value,
    //       dep_sector: event.target.departure_sector.value,
    //       ret_date: event.target.ticket_arrival_date.value,
    //       ret_airline: event.target.arrival_airline.value,
    //       ret_sector: event.target.arrival_sector.value,
    //     });

    //     const out = doc.getZip().generate({
    //       type: "blob",
    //       mimeType:
    //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //     }); //Output the document using Data-URI

    //     setDocBlob(URL.createObjectURL(out));
    //     saveAs(out, empID.concat(".docx"));

    //     // window.location.reload(true);
    //   }
    // );
    // // this.props.history.push('/');
  }

  return (
    <>
      {isSubmitted ? (
        <LeaveForm {...subProps} />
      ) : (
        <Flowbite theme={{ mode: "dark" }}>
          <main className="flex flex-col min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
            <img src={gsLogo} className="h-20" alt="GS Inima LOGO" />
            <h2 className="text-center text-lg font-bold text-gray-200">
              HR & Administration Department
            </h2>
            <h2 className="text-center text-lg font-bold text-gray-200">
              Leave Application Form
            </h2>

            {isLoading ? (
              <div class="mx-auto w-[600px] bg-gray-950 rounded-xl overflow-hidden">
                <div class="flex dark:bg-gray-800 p-8 justify-center items-center h-[450px]">
                  <div class="text-center space-y-6">
                    <div class="w-24 h-24 border-4 border-t-[#00e600] border-gray-700 rounded-full animate-spin mx-auto"></div>
                    <div class="text-[#00e600] font-semibold text-4xl opacity-90 animate-fadeIn">
                      Loading Data...
                    </div>
                    <div class="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
                      <p>We're getting everything ready for you...</p>
                      <p>Sit tight for just a moment.</p>
                    </div>
                  </div>
                </div>

                <div class="bg-[#202020] p-4 text-center text-gray-400 text-xs font-mono">
                  <p>Appreciate your patience. Almost there!</p>
                </div>
              </div>
            ) : (
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
                        onChange={handleLeaveType}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="">Leave Type</option>
                        <option value="AL">Annual Leave</option>
                        <option value="SL">Sick Leave</option>
                        <option value="RL">Rotation Leave</option>
                        <option value="EL">Emergency Leave</option>
                        <option value="PL">Paternity Leave</option>
                        <option value="CML">Compensatory Leave</option>
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
                        return (
                          <option value={option.value}>{option.key}</option>
                        );
                      })}
                    </select>
                    <input
                      type="text"
                      name="empID"
                      value={empID}
                      className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Employee Number"
                      disabled
                    />
                    <input
                      type="text"
                      name="empJobTitle"
                      value={empJobTitle}
                      className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Job Title"
                      disabled
                    />
                    <input
                      type="text"
                      name="empDOJ"
                      value={empDOJ}
                      className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Date of Joining"
                      disabled
                    />
                    <input
                      type="text"
                      name="empLocation"
                      value={empLocation}
                      className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Project / Location"
                      disabled
                    />
                    <input
                      name="visaExpiration"
                      type="text"
                      className="w-full rounded-md border-0 bg-gray-700 p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Visa Expiration"
                      disabled
                    />
                  </section>
                  <div
                    style={
                      hideData
                        ? {
                            maxHeight: "0rem",
                            transition: "max-height 2s ease-out",
                          }
                        : {
                            maxHeight: "100rem",
                            transition: "max-height 2s ease-out",
                          }
                    }
                    className="overflow-hidden"
                  >
                    <LeaveData
                      key={seed}
                      isDisabled={isDisabled}
                      empUAENum={empUAENum}
                      leaveTpe={leaveTpe}
                    />
                  </div>
                </form>
              </div>
            )}
          </main>
        </Flowbite>
      )}
    </>
  );
}

export default App;
