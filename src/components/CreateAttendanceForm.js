import React from "react";

const CreateAttendanceForm = ({func, setDescription}) => {
  return (
    <form className="conatiner-login-form" onSubmit={func}>
      <input onChange={(text) => setDescription(text.target.value)} placeholder="Descrição" />
      <button>Criar</button>
    </form>
  );
};

export default CreateAttendanceForm;
