import React, {useState} from 'react';
import {DatePicker, Input, SelectPicker} from "rsuite";
import MyButton from "../UI/Button/MyButton";
import {getDate} from "rsuite/cjs/utils/dateUtils";

const CreateConsultation = (create: any) => {
    const [cons, setCons] = useState({birthday: '', symptoms: ''})
    const addNewCons = (e: any) => {
        e.preventDefault()
        const newCons = {
            ...cons, id:Date.now()
        }
        create(newCons)
    }

    return (
        <form>
            <DatePicker
                oneTap format="yyyy-MM-dd HH:mm"
                onChange={(e:any) => setCons({...cons,birthday: e.target.value})}
                placeholder={"Дата рождения"}
                style={{width: "100%"}}
            />
            <Input
                value={cons.symptoms}
                onChange={(value: string,e:any) => setCons({...cons,symptoms: e.target.value})}
                type={"textarea"}
                placeholder={"СНИЛС"}/>
            <MyButton style={{marginTop: 20, width: "100%"}} onClick={addNewCons}>Создать консультацию</MyButton>
        </form>
    );
};

export default CreateConsultation;