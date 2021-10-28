import * as React from 'react';
import {Button, FormControl, Modal} from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {
  AppTitle, DefinitionBody,
  DefinitionHeader,
  DefinitionSide, EditButton, EditIcon,
  SearchBody,
  SearchForm,
  SearchHeader,
  SearchSide,
  Title, TransperentButton, UpdateWordBar,
  Wrapper, AddIcon, DeleteIcon, SearchResult, SearchRecommend, Input
} from "./style";

export const DashBoard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditWord, setIsEditWord] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [voice, setVoice] = useState('banmaiace');
  const [speachVoice, setSpeachVoice] = useState('');
  const [wordTarget, setWordTarget] = useState("");
  const [wordExplain, setWordExplain] = useState("");
  const [pronounce, setPronounce] = useState("");
  const [word, setWord] = useState();
  const [history, setHistory] = useState([]);

  const getVoice = async () => {
    console.log('voice', voice)
    var querystring = require('querystring');
    var data = querystring.stringify({
      '': word ? word?.wordTarget : "trang",
    });
    let formData = new FormData();
    formData.append('data', 'trang kieu nguyen');

    const res = await axios.post('https://api.fpt.ai/hmi/tts/v5', data, {
      headers: {
        'api-key': '6D3FBqYomAZhlKKNAx1pe3TIq6gVSNMR',
        'speed': '',
        'voice': voice,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    setSpeachVoice(res?.data?.async);
  };

  const searchWord = async (wordTarget) => {
    let res = await axios.get('http://localhost:8080/words/findByWorldTarget', {
      params: {wordTarget: wordTarget},
    });
    let data = res.data;
    return data;
  };

  const deleteWord = async (id) => {
    return await axios.delete(`http://localhost:8080/words/${id}`).then(() =>
        setWord(null)
    )

  };

  const checkData = async () => {
    const CheckWordTarget = await searchWord(wordTarget);
    if (CheckWordTarget.length !== 0) setError(true);
    if (
        pronounce === "" ||
        wordExplain === "" ||
        wordTarget === "" || CheckWordTarget.length !== 0
    )
      return null;

    return {
      wordTarget: wordTarget,
      wordExplain: wordExplain,
      pronounce: pronounce,
    }
  }

  const creatnewWord = async () => {
    setSubmit(true);
    const data = await checkData();
    console.log('data', data);
    if (data) {
      const boby = {
        wordTarget: wordTarget,
        wordExplain: wordExplain,
        pronounce: pronounce,
      }
      console.log(11111111)
      let res = await axios.post('http://localhost:8080/words', boby).then(() => {
        // eslint-disable-next-line no-unused-expressions
        setPronounce(""),
            setWordExplain(""),
            setWordTarget(""),
            setOpenModal(false),
            setSubmit(false);
      })
      setError(true);
    }
  }

  const changeEdit = async () => {
    const boby = {
      id: word.id,
      wordTarget: wordTarget,
      wordExplain: wordExplain,
      pronounce: pronounce,
    }
    console.log('boby', boby)
    let res = await axios.post('http://localhost:8080/words', boby).then(() => {
      // eslint-disable-next-line no-unused-expressions
      setPronounce(""),
          setWordExplain(""),
          setWordTarget(""),
          setOpenModal(false),
          setSubmit(false);
      setIsEditWord(false);
      setWord(boby);
    })
    setError(true);
  }

  const editWord = async () => {
    setWordTarget(word.wordTarget);
    setWordExplain(word.wordExplain);
    setPronounce(word.pronounce);

  };

  const handleSearch = async (wordTarget) => {
    const searWord = await searchWord(wordTarget);
    setWord(searWord);
  };

  console.log('error', error)
  console.log('subomit', submit)
  console.log('isEditWord', isEditWord)

  useEffect(() => {
    getVoice();
  }, [voice])
  console.log('speachVoice', speachVoice)

  const renderResult = () => {
    const a = ['youthful','zoom','zoo','yes','red','blue','green','pink','tiger','elephant', 'monkey'];
    let result = [];
    a.map((i)=> result.push(<span style={{margin:'10px'}}>{i}</span>))
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
              <SearchRecommend>
                <span style={{fontSize: '20px', color: '#033567'}} >search history:</span><br/> <br/><br/>
                <div style={{display: 'flex', maxWidth: '300px'}}>
                {renderResult()}
                </div>
              </SearchRecommend>
            </div>
          </SearchBody>
        </SearchSide>
        <DefinitionSide>
          <DefinitionHeader>
            <Title>Definition</Title>
            {/* eslint-disable-next-line no-unused-expressions */}
            <div>
              <TransperentButton onClick={() => setOpenModal(true)}>
                <AddIcon/>
                <span>Add</span>
              </TransperentButton>
              <div>
                <select style={{border: '2px solid white', borderRadius: '5px', color: '#0a4580'}}
                        onChange={(e) => setVoice(e.target.value)}>
                  <option hidden>chooose voice</option>
                  <option value={'banmaiace'}>north women</option>
                  <option value={'lannhi'}>south women</option>
                  <option value={'minhquangace'}>north men</option>
                </select>
              </div>
            </div>
          </DefinitionHeader>
          {word ?
              <div style={{margin: '60px'}}>
                <DefinitionBody>
                  <div> *{word?.wordTarget}</div> <br/>
                  <div> -/{word?.pronounce}/</div> <br/>
                  <div> - {word?.wordExplain}</div>
                </DefinitionBody>
                <UpdateWordBar>
                  <ReactAudioPlayer
                      src={speachVoice}
                      autoPlay
                      controls
                  />
                  <EditButton onClick={() => {
                    setIsEditWord(true);
                    setOpenModal(true);
                    editWord()
                  }}
                  >
                    <EditIcon/>
                    <span>Edit</span>
                  </EditButton>

                  <EditButton onClick={() => deleteWord(word?.id)}>
                    <DeleteIcon/>
                    <span>Delete</span>
                  </EditButton>
                </UpdateWordBar></div> : null}
          <Modal centered show={openModal} onHide={() => setOpenModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>ADD-EDIT WORD</Modal.Title>
            </Modal.Header>
            <br/>
            <br/>
            <Modal.Body>
              <div className="mb-12">
                <label>
                  Word Target<span className="text-red-600">*</span>{" "}<br/>
                </label>
                <br/>
                <Input
                    value={wordTarget}
                    onChange={(e) => {
                      e.target.value.trim() ? setWordTarget(e.target.value) : setWordTarget("")
                    }}
                /><br/><br/>
                {submit && wordTarget === "" ? (
                    <small>This field is required.</small>
                ) : null}
              </div>
              <div className="mb-12">
                <label>
                  Pronounce<span className="text-red-600">*</span>{" "}<br/>
                </label>
                <br/>
                <Input
                    value={pronounce}
                    onChange={(e) => {
                      e.target.value.trim() ? setPronounce(e.target.value) : setPronounce("")
                    }}
                /><br/><br/>
                {submit && pronounce === "" ? (
                    <small>This field is required.</small>
                ) : null}
              </div>
              <div className="mb-12">
                <label>
                  Word Explain<span className="text-red-600">*</span>{" "}<br/>
                </label>
                <br/>
                <Input
                    value={wordExplain}
                    onChange={(e) => {
                      e.target.value.trim() ? setWordExplain(e.target.value) : setWordExplain("")
                    }}
                /><br/>
                {submit && wordExplain === "" ? (
                    <small>This field is required.</small>
                ) : null}
              </div>
            </Modal.Body>
            {error && submit ? (
                <small style={{color: 'red',marginLeft: '180px'}}>this word already exist</small>
            ) : null}
            <Modal.Footer>
              <Button variant="secondary">
                Close
              </Button>
              <Button variant="primary" onClick={isEditWord ? changeEdit : creatnewWord}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </DefinitionSide>
      </Wrapper>
  );
};

export default DashBoard;
