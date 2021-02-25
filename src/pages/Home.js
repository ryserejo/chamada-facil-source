import React from "react";
import { useEffect, useState } from "react";
import "../App.css";
import app from "../services/base";
import CreateAttendanceForm from "../components/CreateAttendanceForm";
import AssignAttendanceForm from "../components/AssignAttendanceForm";

const db = app.firestore()

function Home({ history }) {
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [description, setDescription] = useState("Sem descrição");
  const [isButtonViseble, setButtonViseble] = useState(true);
  const [AttendanceId, setAttendanceId] = useState();

  useEffect(() => {
    Startup();
  }, []);

  const Startup = () => {
    setUsername(app.auth().currentUser.displayName);
    setUserId(app.auth().currentUser.uid)
    console.log(app.auth().currentUser);
  };

  const goLogout = () => {
    app.auth().signOut();
  };

  const goAsign = (e) => {
    e.preventDefault();

    if (AttendanceId){
      history.push(`/view/${AttendanceId}`);
    } else {
      alert("Insira o código da chamada")
    };
  };

  const goCreateNewAttendace = (e) => {
    e.preventDefault();

    console.log("Baking new attendance")

    
    db.collection("attendances").add({
      creatorID: userId,
      dateCreated: new Date().toDateString(),
      descrition: description,
      answers: []
    }).then(docRef => {
      console.log(docRef.id);
      history.push(`/view/${docRef.id}`);
    });
  };

  const goViewAttendances = (e) => {
    history.push("/my-attendances");
  };

  const setViewButtons = () => {
    if (isButtonViseble) {
      setButtonViseble(false);
    } else {
      setButtonViseble(true);
    }
  };

  return (
    <main>
      <h1>Chamada Fácil</h1>
      <p>Olá {username}.</p>

      {isButtonViseble ? 
      <AssignAttendanceForm 
      func={goAsign}
      setAttendanceId={setAttendanceId}
      /> 
        : 
      <CreateAttendanceForm 
      func={goCreateNewAttendace} 
      setDescription={setDescription}
      />}
      <div className="home-buttons-bar">

      <button onClick={goViewAttendances}>Ver minhas chamadas</button>
      <button onClick={setViewButtons}>
        {isButtonViseble ? "Criar uma nova chamada" : "Responder a uma Chamada"}
      </button>
      <button className="logoutBTN" onClick={goLogout}>Sair</button>
      </div>
    </main>
  );
}

export default Home;
