import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import app from "../services/base";

const db = app.firestore();

function AttendenceView({ history }) {
  const [assigners, setAssigners] = useState([]);
  const [description, setDescription] = useState();
  const [data, setData] = useState();
  const [userName, setUsername] = useState();

  const { id } = useParams();
  const doc = db.collection("attendances").doc(id);

  const getData = () => {
    const { displayName } = app.auth().currentUser;
    setUsername(displayName);

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        let { dateCreated, answers, descrition } = docSnapshot.data();
        setDescription(descrition);
        setData(dateCreated);
        setAssigners(answers);
        console.log(docSnapshot.data());
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
        alert("Essa chamada não está disponível.");
        history.push("/");
      }
    );
  };

  const goAddMeToAttendance = async () => {
    if (assigners.includes(userName)) {
      alert("Você já assinou esta chamada");
    } else {
      setAssigners(assigners.push(userName));
      const res = await doc.update({ answers: assigners });
    }
  };

  const assignersList = () => {
    if (typeof assigners === "object") {
      return assigners.map((text) => (
        <li key={assigners.indexOf(text)}>{text}</li>
      ));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>Vista da chamada</h1>
      <div className="attendance-view-header">
        <div className="attendance-view-header-a">
        <p id={'data-p'}>{data}</p>
        <p>"{description}"</p>
        </div>
        <code>{id}</code>
      </div>

      <ol>{assignersList()}</ol>
      <button onClick={goAddMeToAttendance}>Assinar chamada</button>
    </main>
  );
}

export default AttendenceView;
