import * as React from "react";
import classnames from 'classnames/bind';
import styles from './dashboard.module.scss';
import axios from "axios";
import {useState} from "react";
import Popup from "../../components/Popup";

const cx = classnames.bind(styles);

interface IWord {
    wordTarget: string;
    wordExplain: string;
}

export const DashBoard: React.FC = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [word, setWord] = useState<IWord>();
    const searchWord = async (wordTarget: string) => {
        let res = await axios.get('http://localhost:8080/words/findByWorldTarget', {params: {wordTarget: wordTarget}});
        // let res = await axios.get('http://localhost:8080/words/findByWorldTarget?wordTarget=computer');
        let data = res.data;
        console.log(data);
        return data
    };
    const handleSearch = async (wordTarget: string) => {
        const searWord = await searchWord(wordTarget);
        setWord(searWord);
    }
    const addNewWord = async () => {
        setOpenPopup(true);
    }
    console.log('word', word);
    return (
        <div >
            <div style={{height: '100px'}}>
                <button onClick={addNewWord}>add new word</button>
                <Popup
                    open={openPopup}
                    handleClose={() => setOpenPopup(!openPopup)}
                    action={'Add new word'}
                />
            </div>
            <div className={cx('body')}>
                <div style={{width: '40%', borderRight: '1px solid black'}}>
                    <input
                        maxLength={100}
                        id="project"
                        value={word?.wordTarget}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                </div>
                <div>
                    {word?.wordExplain}
                </div>
            </div>
        </div>
    );
};
export default DashBoard;