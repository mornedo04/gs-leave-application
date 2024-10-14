// import logo from "./logo.svg";
import React, { Component, PropTypes } from "react";

import gsLogo from "./images/gs-inima-Transparent.png";
import LeaveTypeCheckBox from "./components/LeaveTypeCheckBox";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default class LeaveForm extends Component {

  
  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 300);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <main className="">
        <div className="mb5">
          <button onClick={this.printDocument}>Print</button>
        </div>
        <div
          id="divToPrint"
          className="flex flex-col text-lg items-center *:p-1  w-[1240px] h-[1754px] m-auto p-8"
        >
          <img className="w-48" src={gsLogo} alt="gsLogo"></img>
          <div className="font-bold">HR & Administration Department</div>
          <div className="font-bold">Leave Application Form</div>
          <div className="w-full">
            <p className="font-bold">
              A. <u>Leave Request Information</u>
            </p>
          </div>

          <LeaveTypeCheckBox />

          <div className=" grid grid-cols-7 gap-2 w-full !px-4">
            <div>Neme:</div>
            <div className="border-black border-2 col-span-3"></div>
            <div>Emp No:</div>
            <div className="border-black border-2 col-span-2"></div>

            <div>Job Title:</div>
            <div className="border-black border-2 col-span-3"></div>
            <div>Date of Joining:</div>
            <div className="border-black border-2 col-span-2"></div>

            <div>Project/Location:</div>
            <div className="border-black border-2 col-span-3"></div>
            <div>Visa Expiration:</div>
            <div className="border-black border-2 col-span-2"></div>
          </div>

          <div className="w-full">
            <p className="font-bold">
              B. <u>Contact Address on Leave</u>
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 w-full !px-4">
            <div>Home Country Address:</div>
            <div className="col-span-3 border-black border-2"></div>
            <div>Contact No. Home Country:</div>
            <div className="border-black border-2"></div>
            <div className="text-center">Contact No. UAE:</div>
            <div className="border-black border-2"></div>
          </div>

          <div className="w-full">
            <p className="font-bold">
              C. Contact – Please confirm your incoming schedule, via
              mail/mobile number listed below at least 5 days before you travel.
              Otherwise, transportation will not be arranged.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 w-full !px-4">
            <div>Contact No. - +971</div>
          </div>

          <div className="w-full">
            <p className="font-bold">
              D. <u>Request Leave Details</u>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 w-full !px-4">
            <div>Leave Start Date </div>
            <div className="border-black border-2"></div>
            <div className="text-center">Outgoing Travel Date</div>
            <div className="border-black border-2"></div>
            <div>Leave End Date</div>
            <div className="border-black border-2"></div>
            <div className="text-center">Incoming Travel Date</div>
            <div className="border-black border-2"></div>
          </div>

          <div className="flex gap-2 w-full !px-14   text-center align-middle">
            <div className="flex-grow grid grid-cols-4">
              <div className="col-span-3 border-black border-r-0   border-2">
                Total No. Of Leave Days <br /> Excluding weekends / holidays
              </div>
              <div className="flex justify-center items-center border-black border-2">
                DAYS
              </div>
            </div>
            <div className="flex-grow grid grid-cols-4">
              <div className="col-span-3 border-black border-r-0 border-2">
                Total No. of Leave Days <br /> Including weekends / holidays
              </div>
              <div className="flex justify-center items-center border-black border-2">
                DAYS
              </div>
            </div>
          </div>

          <div className="flex w-full !px-4">
            <div className="w-52 flex justify-center border-black border-2 border-r-0">
              Remraks
            </div>
            <div className="flex-grow flex justify-center border-black border-2"></div>
          </div>

          <div className="w-full">
            <p className="font-bold">
              E. <u>Flight Booking</u>
            </p>
          </div>

          <div className="!px-4 w-full text-center">
            <div className="border-black border-2 p-2">
              <div className="flex">
                <div className="flex-1">BOOKING TO BE MADE BY:</div>
                <div className="flex-1 grid grid-cols-3 !px-20">
                  <div className="border-black border-2"></div>
                  <div className="col-span-2">COMPANY</div>
                </div>
                <div className="flex-1 grid grid-cols-3  !px-20">
                  <div className="border-black border-2"></div>
                  <div className="col-span-2">OWN</div>
                </div>
              </div>
              <div className="grid grid-cols-5">
                <div></div>
                <div>Date</div>
                <div>Airline</div>
                <div className="col-span-2">Section</div>

                <div>Departure</div>
                <div className="border-black border-2 border-r-0"></div>
                <div className="border-black border-2 border-r-0"></div>
                <div className="col-span-2 border-black border-2"></div>

                <div>Arival</div>
                <div className="border-black border-2 border-r-0 border-t-0"></div>
                <div className="border-black border-2 border-r-0 border-t-0"></div>
                <div className="col-span-2 border-black border-2 border-t-0"></div>
              </div>
            </div>
          </div>

          <div className="flex w-full text-right !px-4">
            <div className="flex-1">Signature of Employee:</div>
            <div className="flex-1 border-black border-b-2"></div>
            <div className="flex-1">Manager:</div>
            <div className="flex-1 border-black border-b-2"></div>
            <div className="flex-1">Project Director:</div>
            <div className="flex-1 border-black border-b-2"></div>
          </div>

          <div className="!px-4 w-full text-center font-bold">
            <div className="border-black border-2 p-2">
              ( TO BE COMPLETED BY MANAGER )
            </div>
            <div className="flex">
              <div className="flex-1 border-black border-2 border-t-0">
                Name of Temporary Replacement Employee
                <br />
                Job Title
              </div>
              <div className="w-64 flex flex-col">
                <div className="border-black border-r-2 h-full"></div>
                <div className="border-black border-2 border-l-0 h-full"></div>
              </div>
              <div className="w-24"></div>
            </div>
          </div>

          <div className="w-full">
            <p className="font-bold">F.</p>
          </div>

          <div className="!px-4 w-full text-center">
            <div className="border-black border-2 p-2">
              <div className="flex">
                <div className="flex-1">Leave Approved</div>
                <div className="flex-1 border-black border-2"></div>
                <div className="w-3/4 text-left !px-4">Days</div>
              </div>
              <div className="flex w-full text-right !pt-8">
                <div className="flex-1">Signature of Employee:</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Manager:</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Project Director:</div>
                <div className="flex-1 border-black border-b-2"></div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="font-bold">F.</p>
          </div>

          <div className="!px-4 w-full text-center">
            <div className="border-black border-2 p-2 *:!pt-4">
              <div className="flex">
                <div className="">
                  No. of months completed since last leave:
                </div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Leave Due:</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Air ticket Due:</div>
                <div className="flex-1 border-black border-b-2"></div>
              </div>
              <div className="flex">
                <div className="">Number of Leave Days:</div>
                <div className="flex-1">Paid:</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Unpaid:</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Total:</div>
                <div className="flex-1 border-black border-b-2"></div>
              </div>
              <div className="flex">
                <div className="flex-1">HR/FD/PM</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-1">Supervising Coordinator</div>
                <div className="flex-1 border-black border-b-2"></div>
              </div>
              <div className="w-full text-left">Authorized By:</div>
              <div className="w-full text-left">1) Annual leave application shall be made at least 30 days in advance</div>
              <div className="flex">
                <div className="flex-1">Distribution: </div>
                <div className="flex-1">Original with file</div>
                <div className="flex-1">Copy:</div>
                <div className="">With Approved Air Ticket Application</div>
              </div>
            </div>
          </div>
          <div className="text-base text-blue-900 font-bold">GS Inima Desalination LLC, Office No 1211, 12 Floor, Addax Tower, Al Reem Island Abu Dhabi UAE +971 2 58 1148 The end. The end.</div>
        </div>
      </main>
    );
  }
}
