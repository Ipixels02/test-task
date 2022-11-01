import React, {useEffect, useMemo, useState} from 'react';
import MyInput from "../UI/Input/MyInput";
import ListUsers from "./ListUsers";
import MyModal from "../UI/Modal/MyModal";
import MyButton from "../UI/Button/MyButton";
import data from "../data/db.json";
import CreatePatient from "./CreatePatient";
import CreateConsultation from "./CreateConsultation";

const MainPage = () => {
    const [users, setUsers] = useState<any>(data); //Получаем список пациентов
    const [modal, setModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [modalVariant, setModalVariant] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const searchedUsers = useMemo(() => {
        return users.filter((user: any) => Object.keys(user).some((prop) => {
            return (user[prop] + "").toLowerCase().includes(searchQuery?.toLowerCase())
        }))
    }, [searchQuery])

    console.log(users)
    const createPatient = (newPatient: any) => {
        setUsers([...users, newPatient])
        setModal(false)
        console.log(newPatient)
    }

    const removeUser = (user: any) => {
        setUsers(data.filter(p => p.id !== user.id));
    }

    const setModalVar = (variant: any) => { // устанавливает вариант модалки
        setModalVariant(variant)
    }

    const getModal = () => { // определяет какую модалку отрендерить на основе стейта modalVariant
        switch (modalVariant) {
            case 'value1':
                return <CreatePatient create={createPatient}/>

            case 'value2':
                return <CreateConsultation create={createPatient}/>
        }
    }
    return (
        <div className="App">
            <h1 style={{textAlign: "center", paddingBottom: 50}}>Консультации для пациентов</h1>
            <MyInput
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder={"Поиск..."}
            />
            <ListUsers remove={removeUser} users={searchedUsers}/>

            {/*{isOpen &&*/}
            {/*    <MyModal>{getModal()}</MyModal>*/}
            {/*}*/}
            {/*<MyButton style={{marginTop: 40}} onClick={() => setModalVar('value1')}>*/}
            {/*    Создать пользователя*/}
            {/*</MyButton>*/}
            {/*<MyButton style={{margin: 40}} onClick={() => setModalVar('value2')}>*/}
            {/*    Назначить консультацию*/}
            {/*</MyButton>*/}

            <MyButton style={{marginTop: 40}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <CreatePatient create={createPatient}/>
            </MyModal>


        </div>
    );
};

export default MainPage;