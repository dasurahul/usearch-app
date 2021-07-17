import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link, useHistory } from "react-router-dom";

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
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState([]);
  const [relatedSearches, setRelatedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    document.title = q;
    axios
      .request({
        method: "GET",
        url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI",
        params: {
          q: q,
          pageNumber: pageNumber,
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
        setRelatedSearches(response.data.relatedSearch);
        setLoading(false);
      })
      .catch(function (error) {
        setError(true);
      });
  }, [q, pageNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber, q]);

  useEffect(() => {
    setPageNumber(1);
  }, [q]);

  return (
    <div>
      <div style={{ marginTop: "15px", marginBottom: "30px" }}>
        <Header />
      </div>
      <Form input={q} />
      {error ? (
        <div
          style={{ maxWidth: "800px", margin: "50px auto", padding: "0 25px" }}
        >
          <div
            style={{ marginBottom: "15px", fontSize: "18px", color: "#555" }}
          >
            Something went wrong
          </div>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Please try after some time
          </p>
        </div>
      ) : (
        <div>
          <div style={{ maxWidth: "800px", margin: "25px auto" }}>
            {!loading && (
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" style={{ color: "#1a0dab" }}>
                  Usearch
                </Link>
                <Typography color="textPrimary">{q}</Typography>
              </Breadcrumbs>
            )}
          </div>
          <Results>
            {items.map((item) => {
              return (
                <div key={item.id} style={{ marginBottom: "25px" }}>
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
          <div style={{ maxWidth: "800px", margin: "25px auto" }}>
            {loading ? (
              <Skeleton />
            ) : (
              relatedSearches.length > 0 && (
                <h3 style={{ marginBottom: "20px" }}>Related Searches</h3>
              )
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <div>
                {relatedSearches.map((search) => {
                  const string = search.replace(/(<([^>]+)>)/gi, "");
                  return (
                    <p
                      style={{
                        marginBottom: "10px",
                        padding: "10px 0",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        history.push(`/search/${string}`);
                      }}
                    >
                      <i
                        className="fa fa-search"
                        style={{ marginRight: "15px", color: "#aaa" }}
                      ></i>
                      {string}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ maxWidth: "800px", margin: "25px auto" }}>
            {!loading && (
              <Button
                onClick={() => {
                  setPageNumber((number) => number + 1);
                }}
              >
                More Results
              </Button>
            )}
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Search;
