import React, {useState} from 'react';
import MyButton from "../UI/Button/MyButton";
import MyInput from "../UI/Input/MyInput";
import {DatePicker, Form, Input, Schema, SelectPicker, TagPicker} from "rsuite";
import {StringType} from "schema-typed";
import {ItemDataType} from "rsuite/cjs/@types/common";

const CreatePatient = ({create}: any) => {
    const [user, setUser] = useState({firstName: '', lastName: '', patro: '',birthday: new Date().toLocaleDateString('fr-FR'), gender: '', snils: ''})
    const [dateValue, setDateValue] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const gender = ['Мужчина', 'Женщина'].map(
        item => ({ label: item, value: item })
    );

    const model = Schema.Model({
        firstName: StringType().isRequired('Это обязательное поле'),
        lastName: StringType().isRequired('Это обязательное поле'),
        date: StringType().isRequired('Это обязательное поле'),
        gender: StringType().isRequired('Это обязательное поле'),
        snils: StringType().isRequired('Это обязательное поле')
    });

    const TextField = (props: any) => {
        const { name, accepter, placeholder, ...rest } = props;
        return (
            <Form.Group controlId={`${name}-3`}>
                <Form.Control placeholder={placeholder} name={name} accepter={accepter} {...rest}/>
            </Form.Group>
        );
    }

    const addNewUser = (e: any) => {
        e.preventDefault()
        const newUser = {
            ...user, id:Date.now()
        }
        create(newUser)
        setUser({firstName: '', lastName: '', patro: '',birthday: new Date().toLocaleDateString(), gender: '', snils: ''})
        //console.log(newUser)
    }

    return (
        <Form model={model} >
            {/*<TextField placeholder={"Фамилия"} name="name"/>*/}
            {/*<TextField placeholder={"Имя"} name="name"/>*/}
            <Input
                value={user.firstName}
                onChange={(value: string,e:any) => setUser({...user,firstName: e.target.value})}
                type={"text"}
                placeholder={"Фамилия"}/>
            <Input
                value={user.lastName}
                onChange={(value: string,e:any) => setUser({...user,lastName: e.target.value})}
                type={"text"}
                placeholder={"Имя"}/>
            <Input
                value={user.patro}
                onChange={(value: string,e:any) => setUser({...user,patro: e.target.value})}
                type={"text"}
                placeholder={"Отчество"}/>
            <DatePicker
                value={dateValue}
                oneTap format="yyyy-MM-dd"
                onSelect={(date: Date, e:any) => setUser({...user, birthday: e.target.value})}
                placeholder={"Дата рождения"}
                style={{width: "100%"}}
            />
            <SelectPicker
                data={gender}
                searchable={false}
                placeholder={"Выберете пол"}
                style={{width: "100%"}}
                onSelect={(value: string, item: ItemDataType) => setUser({...user, gender: value})}
            />
            <Input
                value={user.snils}
                onChange={(value: string,e:any) => setUser({...user,snils: e.target.value})}
                type={"text"}
                placeholder={"СНИЛС"}/>
            <MyButton style={{marginTop: 20, width: "100%"}} onClick={addNewUser}>Создать пациента</MyButton>
        </Form>
    );
};

export default CreatePatient;