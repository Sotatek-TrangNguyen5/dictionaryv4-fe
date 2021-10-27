import * as React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Popup from 'components/Popup';
import styled, { css } from 'styled-components';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/outline';

const Wrapper = styled.div`
  display: flex;
`;

const SearchSide = styled.div`
  width: 30%;
  height: calc(100vh - 160px);
  background-color: #eee;
`;

const DefinitionSide = styled.div`
  position: relative;
  width: 70%;
  height: calc(100vh - 160px);
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
  justify-content: space-between;
  align-items: flex-end;
  background-color: #0a4580;
`;

const DefinitionBody = styled.div`
  position: relative;
  padding: 8px;
`;

const UpdateWordBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
  text-align: right;
  width: 100%;
`;

const SearchForm = styled.div`
  padding: 8px;
`;

const SearchBody = styled.div``;

const SearchRecommend = styled.div`
  max-height: 432px;
  overflow: auto;
`;

const AppTitle = styled.h1`
  font-size: 14px;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const Icon = css`
  width: 18px;
  margin-right: 4px;
`;

const AddIcon = styled(PlusCircleIcon)`
  ${Icon}
`;

const EditIcon = styled(PencilIcon)`
  ${Icon}
`;

const TransperentButton = styled(Button)`
  background: transparent;
  outline: none;
  border: none;

  &:hover,
  &:focus {
    background: transparent;
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

const EditButton = styled(TransperentButton)`
  color: #333;

  &:hover,
  &:focus {
    color: #333;
  }
`;

const SearchResult = styled.div`
  padding: 8px 22px;

  &:hover {
    color: #fff;
    background-color: #bc0103;
    cursor: pointer;
  }
`;

export const DashBoard = () => {
  const [openModal, setOpenModal] = useState(false);
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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSearch = async (wordTarget) => {
    const searWord = await searchWord(wordTarget);
    setWord(searWord);
  };

  const addNewWord = async () => {};

  const renderResult = () => {
    let result = [];
    for (let i = 1; i < 15; i++) {
      result.push(<SearchResult>hello</SearchResult>);
    }
    return result;
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
        <SearchBody>
          <div>
            <SearchForm>
              <FormControl
                maxLength={100}
                id="project"
                value={word?.wordTarget}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                aria-describedby="inputGroup-sizing-sm"
              />
            </SearchForm>
            <SearchRecommend>{renderResult()}</SearchRecommend>
          </div>
        </SearchBody>
      </SearchSide>
      <DefinitionSide>
        <DefinitionHeader>
          <Title>Definition</Title>
          <TransperentButton onClick={() => setOpenModal(true)}>
            <AddIcon />
            <span>Add</span>
          </TransperentButton>
        </DefinitionHeader>
        <DefinitionBody>Definition here!</DefinitionBody>
        <UpdateWordBar>
          <EditButton onClick={() => setOpenModal(true)}>
            <EditIcon />
            <span>Edit</span>
          </EditButton>
        </UpdateWordBar>
        <Modal centered show={openModal} onHide={() => setOpenModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add/edit new word</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </DefinitionSide>
    </Wrapper>
  );
};

export default DashBoard;
