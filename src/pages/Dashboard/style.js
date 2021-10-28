import styled, {css} from 'styled-components';
import {Button} from 'react-bootstrap';
import {PencilIcon, PlusCircleIcon, TrashIcon} from '@heroicons/react/outline';

export const Wrapper = styled.div`
  display: flex;
`;

export const SearchSide = styled.div`
  width: 30%;
  height: calc(100vh - 160px);
  background-color: #eee;
`;

export const DefinitionSide = styled.div`
  position: relative;
  width: 70%;
  height: calc(100vh - 160px);
`;

export const Header = styled.div`
  height: 100px;
  padding: 8px;
  color: #fff;
`;

export const SearchHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #033567;
  text-align: center;
`;

export const DefinitionHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #0a4580;
`;

export const DefinitionBody = styled.div`
  position: relative;
  padding: 8px;
`;

export const UpdateWordBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom:0 ;
  left: 0;
  padding: 8px;
  text-align: right;
  width: 100%;
`;

export const SearchForm = styled.div`
  padding: 8px;
`;

export const SearchBody = styled.div``;

export const SearchRecommend = styled.div`
  margin-left: 30px;
  margin-top: 50px;
  max-height: 432px;
  overflow: auto;
`;

export const AppTitle = styled.h1`
  font-size: 14px;
`;

export const Title = styled.h2`
  font-size: 20px;
`;

export const Icon = css`
  width: 18px;
  margin-right: 4px;
`;

export const AddIcon = styled(PlusCircleIcon)`
  ${Icon}
`;

export const EditIcon = styled(PencilIcon)`
  ${Icon}
`;

export const DeleteIcon = styled(TrashIcon)`
  ${Icon}
`;
export const TransperentButton = styled(Button)`
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

export const EditButton = styled(TransperentButton)`
  color: #333;

  &:hover,
  &:focus {
    color: #333;
  }
`;


export const SearchResult = styled.div`
  padding: 8px 22px;

  &:hover {
    color: #fff;
    background-color: #bc0103;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 95%;
  border-radius: 7px;
  border-top: 0.5px solid grey;
  margin-left: 3%;
  height: 40px;
`;
