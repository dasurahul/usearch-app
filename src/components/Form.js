import React, { useState, useEffect } from "react";

import styled from "styled-components";

import axios from "axios";

import { useHistory } from "react-router-dom";

const MyForm = styled.form`
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
`;

const FormControl = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 1px 3px 9px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 1px 3px 9px rgba(0, 0, 0, 0.4);
  }
`;

const Input = styled.input`
  flex: 1;
  padding-top: 15px;
  padding-left: 20px;
  padding-bottom: 15px;
  border: none;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
`;

const AutoCompletes = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #eee;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 1;
  box-shadow: 1px 3px 9px rgba(0, 0, 0, 0.2);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #fff;
`;

const Item = styled.div`
  padding-top: 15px;
  padding-left: 20px;
  padding-bottom: 15px;
`;

const Form = (props) => {
  const [input, setInput] = useState(() => {
    if (props.input) {
      return props.input;
    } else {
      return "";
    }
  });
  const [autoCompletes, setAutoCompletes] = useState([]);
  const [show, setShow] = useState(false);
  const open = () => {
    setShow(true);
  };
  const history = useHistory();
  useEffect(() => {
    let cancel;
    axios
      .request({
        method: "GET",
        url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete",
        params: { text: input },
        headers: {
          "x-rapidapi-key":
            "d84e7a8fb6msh1b306d85f61613ap102416jsn062c1ca70521",
          "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(function (response) {
        setAutoCompletes(response.data);
      })
      .catch(function (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      });
    return () => cancel();
  }, [input]);
  const inputHandler = (event) => {
    setInput(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (input.trim().length === 0) {
      return;
    }
    history.push(`/search/${input}`);
    setShow(false);
  };
  return (
    <div>
      <MyForm onSubmit={submitHandler}>
        <FormControl>
          <Input
            type="text"
            placeholder="Search"
            value={input}
            onChange={inputHandler}
            onFocus={open}
          />
          <i
            className="fa fa-search"
            aria-hidden="true"
            style={{
              paddingRight: "20px",
              color: input.trim().length > 0 ? "var(--primary-color)" : "#aaa",
            }}
          ></i>
        </FormControl>
      </MyForm>
      {autoCompletes.length > 0 && show && (
        <AutoCompletes>
          {autoCompletes.map((item) => {
            return (
              <Item
                key={item}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setInput(item);
                  history.push(`/search/${item}`);
                  setShow(false);
                }}
              >
                {item}
              </Item>
            );
          })}
        </AutoCompletes>
      )}
    </div>
  );
};

export default Form;
