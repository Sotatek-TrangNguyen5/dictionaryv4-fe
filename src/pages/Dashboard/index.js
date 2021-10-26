import * as React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import classnames from 'classnames/bind';
import styles from './style.module.scss';
import axios from 'axios';
import { useState } from 'react';
import Popup from 'components/Popup';
import styled from 'styled-components';

const cx = classnames.bind(styles);

const Wrapper = styled.div`
  display: flex;
`;

const SearchSide = styled.div`
  width: 30%;
  background-color: #eee;
`;

const DefinitionSide = styled.div`
  width: 70%;
`;

const Header = styled.div`
  height: 100px;
  padding: 8px;
  color: #fff;
`;

const SearchHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #033567;
  text-align: center;
`;

const DefinitionHeader = styled(Header)`
  display: flex;
  align-items: flex-end;
  background-color: #0a4580;
`;

const SearchForm = styled.div``;

const AppTitle = styled.h1`
  font-size: 14px;
`;

const Title = styled.h2`
  font-size: 20px;
`;

export const DashBoard = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [word, setWord] = useState();

  const searchWord = async (wordTarget) => {
    let res = await axios.get('http://localhost:8080/words/findByWorldTarget', {
      params: { wordTarget: wordTarget },
    });
    // let res = await axios.get('http://localhost:8080/words/findByWorldTarget?wordTarget=computer');
    let data = res.data;
    console.log(data);
    return data;
  };

  const handleSearch = async (wordTarget) => {
    const searWord = await searchWord(wordTarget);
    setWord(searWord);
  };

  const addNewWord = async () => {
    setOpenPopup(true);
  };

  return (
    <Wrapper>
      <SearchSide>
        <SearchHeader>
          <AppTitle>
            Advanced English <strong>Dictionary</strong>
          </AppTitle>
          <Title>Search</Title>
        </SearchHeader>
        <SearchForm>
          <Button variant="outline-primary" onClick={addNewWord}>
            Add new word
          </Button>{' '}
          <Popup
            open={openPopup}
            handleClose={() => setOpenPopup(!openPopup)}
            action={'Add new word'}
          />
          <div>
            <div>
              <FormControl
                maxLength={100}
                id="project"
                value={word?.wordTarget}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                aria-describedby="inputGroup-sizing-sm"
              />
              <input />
            </div>
            <div>{word?.wordExplain}</div>
          </div>
        </SearchForm>
      </SearchSide>
      <DefinitionSide>
        <DefinitionHeader>
          <Title>Definition</Title>
        </DefinitionHeader>
      </DefinitionSide>
    </Wrapper>
  );
};

export default DashBoard;
