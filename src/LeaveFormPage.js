// import logo from "./logo.svg";
import React, { Component, useState } from "react";
// import axios from 'axios';

import gsLogo from "./images/gs-inima-Transparent.png";
import LeaveTypeCheckBox from "./components/LeaveTypeCheckBox";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment/moment";

export default class LeaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isDownloaded: false };
  }
  //${process.env.PUBLIC_URL}/LeaveForms

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      let filename =
        this.props.leaveType +
        " " +
        this.props.emp_no +
        " " +
        this.props.name +
        ".pdf";
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 300);
      pdf.save(filename);
    });
  }

  componentDidMount() {
    // call api or anything
    // e.preventDefault();
    if (!this.state.isDownloaded) {
      window.scrollTo(0, 0);
      const input = document.getElementById("divToPrint");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 300);
        // pdf.output('dataurlnewwindow');
        pdf.save(
          this.props.leaveType +
            " " +
            this.props.emp_no +
            " " +
            this.props.name +
            ".pdf"
        );

        var string = pdf.output("blob");

        // console.log(string)
        const fileURL = URL.createObjectURL(string);

        window.open(fileURL);

        this.setState({ isDownloaded: true });
      });
    }
  }

  render() {
    return (
      <main className="">
        {/* <div className="mb5">
          <button onClick={this.printDocument}>Print</button>
        </div> */}

        {this.state.isDownloaded ? (
          <>
            <div class="flex h-screen">
              <div className="text-center font-bold m-auto">
                <p className="text-4xl ">
                  The Leave Application Form has been downloaded. Kindly sign it
                  and obtain the necessary signature from Management.
                </p>
                <p className="text-5xl p-10">Thank you!</p>
              </div>
            </div>
          </>
        ) : (
          <>
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

              <LeaveTypeCheckBox leaveType={this.props.leaveType} />

              <div className=" grid grid-cols-7 gap-2 w-full !px-4">
                <div>Name:</div>
                <div className="border-black border-2 col-span-3 text-center">
                  {this.props.name}
                </div>
                <div>Emp No:</div>
                <div className="border-black border-2 col-span-2 text-center">
                  {this.props.emp_no}
                </div>

                <div>Job Title:</div>
                <div className="border-black border-2 col-span-3 text-center">
                  {this.props.job_title}
                </div>
                <div>Date of Joining:</div>
                <div className="border-black border-2 col-span-2 text-center">
                  {this.props.doj}
                </div>

                <div>Project/Location:</div>
                <div className="border-black border-2 col-span-3 text-center">
                  {this.props.location}
                </div>
                <div>Date:</div>
                <div className="border-black border-2 col-span-2 text-center">
                  {moment().format("DD-MMM-YYYY")}
                </div>
              </div>

              <div className="w-full">
                <p className="font-bold">
                  B. <u>Contact Address on Leave</u>
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 w-full !px-4">
                <div>Home Country Address:</div>
                <div className="col-span-3 border-black border-2 text-center">
                  {this.props.address}
                </div>
                <div>Contact No. Home Country:</div>
                <div className="border-black border-2 text-center">
                  {this.props.home_contact}
                </div>
                <div className="text-center">Contact No. UAE:</div>
                <div className="border-black border-2 text-center">
                  {this.props.uae_contact}
                </div>
              </div>

              <div className="w-full">
                <p className="font-bold">
                  C. Contact – Please confirm your incoming schedule, via
                  mail/mobile number listed below at least 5 days before you
                  travel. Otherwise, transportation will not be arranged.
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
                <div className="border-black border-2 text-center">
                  {this.props.start_date}
                </div>
                <div className="text-center">Outgoing Travel Date</div>
                <div className="border-black border-2 text-center">
                  {this.props.outgoing_date}
                </div>
                <div>Leave End Date</div>
                <div className="border-black border-2 text-center">
                  {this.props.end_date}
                </div>
                <div className="text-center">Incoming Travel Date</div>
                <div className="border-black border-2 text-center">
                  {this.props.incoming_date}
                </div>
              </div>

              <div className="flex gap-2 w-full !px-14   text-center align-middle">
                <div className="flex-grow grid grid-cols-4">
                  <div className="col-span-3 border-black border-r-0   border-2">
                    Total No. of Leave Days <br /> Including weekends / holidays
                    {/* Total No. Of Leave Days <br /> Excluding weekends / holidays */}
                  </div>
                  <div className="flex justify-center items-center border-black border-2">
                    {this.props.in_day}
                  </div>
                </div>
                <div className="flex-grow grid grid-cols-4">
                  <div className="col-span-3 border-black border-r-0 border-2">
                    {/* Total No. of Leave Days <br /> Including weekends / holidays */}
                  </div>
                  <div className="flex justify-center items-center border-black border-2">
                    {this.props.ex_day}
                  </div>
                </div>
              </div>

              <div className="flex w-full !px-4">
                <div className="w-52 flex justify-center border-black border-2 border-r-0">
                  Reason for Leave
                </div>
                <div className="flex-grow flex justify-center border-black border-2  text-center">
                  {this.props.remarks}
                </div>
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
                      <div
                        className={
                          "border-black border-2 " +
                          (this.props.ticketBooking === "COMPANY"
                            ? "bg-black"
                            : "")
                        }
                      ></div>
                      <div className="col-span-2">COMPANY</div>
                    </div>
                    <div className="flex-1 grid grid-cols-3  !px-20">
                      <div
                        className={
                          "border-black border-2 " +
                          (this.props.ticketBooking === "OWN" ? "bg-black" : "")
                        }
                      ></div>
                      <div className="col-span-2">OWN</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div></div>
                    <div>Date</div>
                    <div>Airline</div>
                    <div className="col-span-2">Sector</div>

                    <div>Departure</div>
                    <div className="border-black border-2 border-r-0 text-center">
                      {this.props.dep_date}
                    </div>
                    <div className="border-black border-2 border-r-0 text-center">
                      {this.props.dep_airline}
                    </div>
                    <div className="col-span-2 border-black border-2 text-center">
                      {this.props.dep_sector}
                    </div>

                    <div>Arival</div>
                    <div className="border-black border-2 border-r-0 border-t-0 text-center">
                      {this.props.ret_date}
                    </div>
                    <div className="border-black border-2 border-r-0 border-t-0 text-center">
                      {this.props.ret_airline}
                    </div>
                    <div className="col-span-2 border-black border-2 border-t-0 text-center">
                      {this.props.ret_sector}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full text-right !px-4 !pt-6">
                <div className="flex-2 text-nowrap">Signature of Employee:</div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-2 text-nowrap text-center">
                  Dep. Head / Manager:
                </div>
                <div className="flex-1 border-black border-b-2"></div>
                <div className="flex-2 text-nowrap">
                  Site Manager / Project Director:
                </div>
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
                    <div className="flex-1 text-nowrap">Leave Approved</div>
                    <div className="flex-1 border-black border-2"></div>
                    <div className="w-3/4 text-left !px-4">Days</div>
                  </div>
                  <div className="flex w-full text-right !pt-8">
                    <div className="flex-1 text-center">HR Manager:</div>
                    <div className="flex-1 border-black border-b-2"></div>
                    <div className="flex-1 text-center">Finance Manager:</div>
                    <div className="flex-1 border-black border-b-2"></div>
                    <div className="flex-1 text-center">Project Director:</div>
                    <div className="flex-1 border-black border-b-2"></div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <p className="font-bold">G.</p>
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
                  <div className="w-full text-left">
                    1) Annual leave application shall be made at least 30 days
                    in advance
                  </div>
                  <div className="flex">
                    <div className="flex-1">Distribution: </div>
                    <div className="flex-1">Original with file</div>
                    <div className="flex-1">Copy:</div>
                    <div className="">With Approved Air Ticket Application</div>
                  </div>
                </div>
              </div>
              <div className="text-base text-blue-900 font-bold">
                GS Inima Desalination LLC, Office No 903, 9th Floor, Abdulla Bin
                Darwish Bldg., Hamdan Bin Mohammed St. 802, Al Zahiya, Abu Dhabi
              </div>
            </div>
          </>
        )}
      </main>
    );
  }
}
