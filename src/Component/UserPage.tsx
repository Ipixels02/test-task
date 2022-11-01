import React, {FC, useState} from 'react';
import {Button, Col, Grid, IconButton, Input, Placeholder, Row} from "rsuite";
import {UserEntity} from "../API/model";
import {Close, Edit} from "@rsuite/icons";
import {useParams} from "react-router-dom";
import data from "../data/db.json";
import MyButton from "../UI/Button/MyButton";
import MyModal from "../UI/Modal/MyModal";
import CreateConsultation from "./CreateConsultation";
import {users} from "./MocDataBase";

const {Paragraph} = Placeholder;

interface PersonalDataComponentInterface {
    defaultValue?: UserEntity
}

export const UserPage = () => {
    const {id} = useParams()

    console.log(users)
    const getUser = () => {
        if (users) {
            return users.filter((user: any) => {
                return user.id === id
            })[0]
        }
        return null
    }

    console.log(getUser())

    const [user, setUser] = useState<any>(getUser())
    const [modal, setModal] = useState(false);

    // @ts-ignore
    const [lastName, setlastName] = useState(data.lastName);
    const [lne, setlne] = useState(false);
    // @ts-ignore
    const [firstName, setFirstName] = useState(data.firstName)
    const [fn, setfn] = useState(false);
    // @ts-ignore
    const [middleName, setMiddleName] = useState(data.middleName)
    const [mn, setmn] = useState(false);

    // const [date, setDate] = useState(birthday)
    // const [dt, setdt] = useState(false);
    // const [gender, setGender] = useState(dgender)
    // const [gnr, setgnr] = useState(false);
    // const [snils, setSnils] = useState(snils);
    // const [sn, setsn] = useState(false);

    const createConsultation = (newPatient: any) => {
        setUser([...user, newPatient])
        setModal(false)
        console.log(newPatient)
    }


    return (
        <div>
            return (
            <Grid style={{padding: "20px", fontSize: 18}}>
                <RenderCustomInput name={"Фамилия"} isEdit={lne} setEdit={setlne} variable={user.lastName}
                                   variablseSet={setlastName}/>
                <RenderCustomInput name={"Имя"} isEdit={fn} setEdit={setfn} variable={user.firstName}
                                   variablseSet={setFirstName}/>
                <RenderCustomInput name={"Отчество"} isEdit={mn} setEdit={setmn} variable={user.patro}
                                   variablseSet={setMiddleName}/>
                {/*<RenderCustomInput name={"Дата рождения"} isEdit={dt} setEdit={setdt} variable={user.birthday}*/}
                {/*                   variablseSet={setDate}/>*/}
                {/*<RenderCustomInput name={"Пол"} isEdit={gnr} setEdit={setgnr} variable={user.gender}*/}
                {/*                   variablseSet={setGender}/>*/}
                {/*<RenderCustomInput name={"Снилс"} isEdit={sn} setEdit={setsn} variable={user.snils}*/}
                {/*                   variablseSet={setSnils}/>*/}
                <Button onClick={() => {

                }} color={"green"} appearance="primary">Сохранить измененеия</Button>
                <Button style={{marginLeft: 30}} onClick={() => {

                }} color={"red"} appearance="primary">Удалить пользователя</Button>

                <MyButton style={{margin: 40}} onClick={() => setModal(true)}>
                    Назначить консультацию
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <CreateConsultation create={createConsultation}/>
                </MyModal>
            </Grid>
            )
        </div>
    )
}

interface RenderCustomInputInterFace {
    isEdit: boolean,
    setEdit: Function,
    variable: any,
    variablseSet: Function,
    type?: string
    name: string
}

const RenderCustomInput: FC<RenderCustomInputInterFace> = ({isEdit, setEdit, variable, variablseSet, type, name}) => {
    if (isEdit) {
        return <Row style={{marginTop: "10px"}}>
            <Col md={4} xs={6}>
                <span>{name}:</span>
            </Col>
            <Col md={12} xs={19}>
                <Input onPressEnter={() => {
                    setEdit(false)
                }
                } type={type} value={variable} onChange={(val) => {
                    variablseSet(val)
                }}/>
            </Col>
            <Col md={1} xs={1}>
                <IconButton onClick={() => setEdit(!isEdit)} icon={<Close/>}/>
            </Col>
        </Row>
    } else {
        return <Row style={{marginTop: "10px"}}>
            <Col md={4} xs={6}>
                <span>{name}:</span>
            </Col>
            <Col md={12} xs={19}><span>{variable}</span></Col>
            <Col md={1} xs={1}><IconButton style={{background: "transparent"}} onClick={() => setEdit(!isEdit)}
                                           icon={<Edit/>}/></Col>
        </Row>

    }
}