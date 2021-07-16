import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

import axios from "axios";

import styled from "styled-components";

const Results = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #1a0dab;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background-color: #fafafa;
  color: #444;
  font-weight: bold;
  width: 100%;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  &:hover {
    background-color: #eee;
  }
`;

const Search = () => {
  const { q } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    document.title = q;
    axios
      .request({
        method: "GET",
        url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI",
        params: {
          q: q,
          pageNumber: "1",
          pageSize: "10",
          autoCorrect: "true",
        },
        headers: {
          "x-rapidapi-key":
            "d84e7a8fb6msh1b306d85f61613ap102416jsn062c1ca70521",
          "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        },
      })
      .then(function (response) {
        setItems(response.data.value);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [q]);
  return (
    <div>
      <div style={{ marginTop: "15px", marginBottom: "30px" }}>
        <Header />
      </div>
      <Form input={q} />
      <div style={{ maxWidth: "800px", margin: "25px auto" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ color: "#1a0dab" }}>
            Usearch
          </Link>
          <Typography color="textPrimary">{q}</Typography>
        </Breadcrumbs>
      </div>
      <Results>
        {items.map((item) => {
          return (
            <div key={item.id} style={{ marginBottom: "20px" }}>
              {loading ? (
                <Skeleton />
              ) : (
                <StyledLink
                  href={item.url}
                  target="_blank"
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontSize: "20px",
                  }}
                >
                  {item.title}
                </StyledLink>
              )}
              {loading ? (
                <Skeleton />
              ) : (
                <div style={{ color: "#186653", marginBottom: "10px" }}>
                  {item.url}
                </div>
              )}
              {loading ? (
                <Skeleton />
              ) : (
                <p style={{ color: "#444", marginBottom: "10px" }}>
                  {item.description.length > 150
                    ? item.description.substring(0, 150).concat("...")
                    : item.description}
                </p>
              )}
            </div>
          );
        })}
      </Results>
      <div style={{ maxWidth: "800px", margin: "20px auto" }}>
        <Button>More Results</Button>
      </div>
    </div>
  );
};

export default Search;
