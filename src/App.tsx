import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ListUsers from "./Component/ListUsers";
import CreatePatient from "./Component/CreatePatient";
import data from "./data/db.json"
import MyButton from "./UI/Button/MyButton";
import MyModal from "./UI/Modal/MyModal";
import MyInput from "./UI/Input/MyInput";
import CreateConsultation from "./Component/CreateConsultation";

function App() {

    const [users, setUsers] = useState<any>(data.users); //Получаем список пациентов
    const [modal,setModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')


    const searchedUsers = useMemo(() => {
        return users.filter((user: any) => Object.keys(user).some((prop) => {
                return (user[prop] + "").toLowerCase().includes(searchQuery?.toLowerCase())
        }))
    }, [searchQuery])

    const createPatient = (newPatient: any) => {
        setUsers([...users, newPatient])
    }

  return (
    <div className="App">
        <h1 style={{textAlign: "center", paddingBottom: 50}}>Консультации для пациентов</h1>
        <MyInput
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            placeholder={"Поиск..."}
        />
        <ListUsers users={searchedUsers}/>

        <MyButton style={{marginTop: 40}} onClick={() => setModal(true)}>
            Создать пользователя
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <CreatePatient create={createPatient}/>
        </MyModal>

        <MyButton style={{margin: 40}} onClick={() => setModal(true)}>
            Назначить консультацию
        </MyButton>
        {/*<MyModal visible={modal} setVisible={setModal}>*/}
        {/*    <CreateConsultation create={createPatient}/>*/}
        {/*</MyModal>*/}
    </div>
  );
}

export default App;
