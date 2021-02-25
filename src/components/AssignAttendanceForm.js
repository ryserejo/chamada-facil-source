import React from "react";

const AssignAttendanceForm = ({func, setAttendanceId}) => {
  return (
    <form className="conatiner-login-form" onSubmit={func}>
      <input onChange={(text) => setAttendanceId(text.target.value)} placeholder="Insira o código da chamada" />
      <button>Assinar chamada</button>
    </form>
  );
};

export default AssignAttendanceForm;
