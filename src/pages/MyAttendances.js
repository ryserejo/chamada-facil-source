import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";
import app from "../services/base";

const db = app.firestore();

function MyAttendances({ history }) {
  const [MyAttendances, setMyAttendances] = useState([]);

  const doc = db.collection("attendances");

  const getData = async () => {
    const docsList = [];

    const user = app.auth().currentUser;
    const queryRef = await doc.where("creatorID", "==", user.uid).get();
    queryRef.docs.forEach((doc) => {
      docsList.push(doc);
      console.log(doc);
    });
    setMyAttendances(docsList);
  };

  const AttendancesList = () => {
    if (MyAttendances.length < 0){
      return <h1>Nenhuma chamada encontrada</h1>
    }
    if (typeof MyAttendances === "object") {
      return MyAttendances.map((item) => (
        <div className="my-attendances-list">
          <li key={MyAttendances.indexOf(item)}>
            <p>{item.data().descrition}</p>
            <Link to={`/view/${item.id}`}>Ver</Link>
          </li>
        </div>
      ));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>Minhas Chamadas</h1>
      {AttendancesList()}
    </main>
  );
}

export default MyAttendances;
