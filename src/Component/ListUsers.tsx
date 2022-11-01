import React, {useEffect, useMemo, useState} from 'react';
import {Button, Table} from 'rsuite';
import {useNavigate} from "react-router-dom";
import {UserPage} from "./UserPage";
import {users} from "./MocDataBase";

const ListUsers = ({users, remove}: any) => {
    const {Column, HeaderCell, Cell} = Table;
    const router = useNavigate()
    const [data, setData] = useState(users);

    useEffect (()=> {
        users = data
    },[data])


    const EditableCell = ({rowData, dataKey, onChange, ...props}: any) => {
        const editing = rowData.status === 'EDIT';
        return (
            <Cell {...props} className={editing ? 'table-content-editing' : ''}>
                {editing ? (
                    <input
                        className="rs-input"
                        defaultValue={rowData[dataKey]}
                        onChange={event => {
                            onChange && onChange(rowData.id, dataKey, event.target.value);
                        }}
                    />
                ) : (
                    <span className="table-content-edit-span">{rowData[dataKey]}</span>
                )}
            </Cell>
        );
    };

    const ActionCell = ({rowData, dataKey, onClick, ...props}: any) => {
        return (
            <Cell {...props} style={{padding: '6px'}}>
                <Button
                    appearance="link"
                    onClick={() => {
                        onClick(rowData.id);
                    }}
                >
                    {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
                </Button>
            </Cell>
        );
    };

    const OpenCell = ({rowData, dataKey, onClick, ...props}: any) => {
        return (
            <div>
                <Cell {...props} style={{padding: '6px'}}>
                    <Button
                        appearance="link"
                        key={rowData.id}
                        onClick={() => router(`/user/${rowData.id}`)}
                        // onClick={() => <UserPage id={rowData.id}/>}
                    >
                        Открыть
                    </Button>
                </Cell>
            </div>
        );
    };

    const DeleteCell = ({rowData, dataKey, onClick, ...props}: any) => {
        return (
            <Cell {...props} style={{padding: '6px'}}>
                <Button
                    appearance="link"
                    onClick={() => {
                        onClick(rowData.id);
                    }}
                >
                    Delete
                </Button>
            </Cell>
        );
    };


    const handleChange = (id: number, key: number, value: any) => {
        const nextData = Object.assign([], data);
        nextData.find((item: any) => item.id === id)[key] = value;
        setData(nextData);
    };
    const handleEditState = (id: number) => {
        const nextData = Object.assign([], data);
        const activeItem = nextData.find((item: any) => item.id === id);
        activeItem.status = activeItem.status ? null : 'EDIT';
        setData(nextData);
    };
    const handleDelete = (rowData: any) => {
        setData(data.filter((p: any) => p.id !== rowData));
        console.log(rowData)
    }


    return (
        <div>
            <h2 style={{textAlign: "center"}}>Список пациентов</h2>
            <Table
                height={400}
                data={data}
            >
                <Column width={60} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <EditableCell dataKey={"id"} onChange={handleChange}/>
                </Column>

                <Column width={100}>
                    <HeaderCell>Имя</HeaderCell>
                    <EditableCell dataKey={"firstName"} onChange={handleChange}/>
                </Column>

                <Column width={100}>
                    <HeaderCell>Фамилия</HeaderCell>
                    <EditableCell dataKey={"lastName"} onChange={handleChange}/>
                </Column>

                <Column width={100}>
                    <HeaderCell>Отчество</HeaderCell>
                    <EditableCell dataKey={"patro"} onChange={handleChange}/>
                </Column>

                <Column width={110}>
                    <HeaderCell>Дата рождения</HeaderCell>
                    <EditableCell dataKey={"birthday"} onChange={handleChange}/>
                </Column>

                <Column width={70}>
                    <HeaderCell>Пол</HeaderCell>
                    <EditableCell dataKey={"gender"} onChange={handleChange}/>
                </Column>

                <Column width={120}>
                    <HeaderCell>Снилс</HeaderCell>
                    <EditableCell dataKey={"snils"} onChange={handleChange}/>
                </Column>
                <Column width={100}>
                    <HeaderCell>Изменить</HeaderCell>
                    <ActionCell dataKey="id" onClick={handleEditState}/>
                </Column>
                <Column width={130}>
                    <HeaderCell>Открыть пациента</HeaderCell>
                    <OpenCell dataKey="id"/>
                </Column>
                <Column width={100} flexGrow={1}>
                    <HeaderCell>Удалить</HeaderCell>
                    <DeleteCell dataKey="id" onClick={(index: any) => handleDelete(index)}/>
                </Column>
            </Table>
        </div>
    );
};

export default ListUsers;