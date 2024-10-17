export default function LeaveTypeCheckBox(props) {
    return(
        <div className="w-full grid grid-cols-12 gap-2 [&>*:nth-child(odd)]:ml-3 [&>*:nth-child(odd)]:mr-3 [&>*:nth-child(even)]:col-span-2 ">
          <div className={"border-black border-2 " + (props.leaveType==="AL"?"bg-black":"")}></div>
          <div>Annual Leave</div>
          <div className={"border-black border-2 " + (props.leaveType==="SL"?"bg-black":"")}></div>
          <div>Sick Leave</div>
          <div className={"border-black border-2 " + (props.leaveType==="RL"?"bg-black":"")}></div>
          <div>Rotation Leave</div>
          <div className={"border-black border-2 " + (props.leaveType==="EL"?"bg-black":"")}></div>
          <div>Emergency Leave</div>
          <div className="col-span-4"></div>
          <div className=""></div>
          <div className={"border-black border-2 " + (props.leaveType==="PL"?"bg-black":"")}></div>
          <div>Paternity Leave</div>
          <div className={"border-black border-2 " + (props.leaveType==="CL"?"bg-black":"")}></div>
          <div>Compassionate Leave</div>
        </div>
    );
}