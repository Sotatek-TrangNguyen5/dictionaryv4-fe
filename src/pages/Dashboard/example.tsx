import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import classnames from 'classnames/bind';
import styles from './Transactions.module.scss';
import {logDOM} from "@testing-library/react";
const cx = classnames.bind(styles);

export const Transaction: React.FC = () => {
    const [name, setName] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const getTransaction = async () => {
        let res = await axios.get('http://localhost:8080/departments');
        let data = res.data;
        setDepartmentList(data);
        console.log(data);
    };
    useEffect(() => {
        getTransaction();
    }, []);
    const submit= async()=>{
        let res = await axios.post('http://localhost:8080/departments',{name : name});
        setName("")
    }
    return (
        <>
        <div>how are you</div>
            <div className={cx('wrapper')}>
                {departmentList?.map((item: any, index:number) => (
                    <div className={cx('body')} key={index}>
                        <span className={cx('body-price')}>{item.id}</span>
                        <span className={cx('body-amount-in')}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="mb-12">
                <label className="text-lg font-normal leading-7">
                    creat new department <span className="text-red-600">*</span>{" "}
                </label>
                <br/>
                <input
                    maxLength={100}
                    id="project"
                    value={name}
                    onChange={(e) => {
                        e.target.value.trim() ? setName(e.target.value) : setName("")
                    }}
                />
            </div>
            <button onClick={submit}>submit</button>
        </>
    );
};
export default Transaction;