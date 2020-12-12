import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  border-bottom: 1px solid black;
  padding: 0 1em;
`;

const Title = styled.h1`
  font-size: 1em;
  padding: 1em 0 0.5em 0;
  margin: 0;
`;

const PageList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const PageListItem = styled.li`
  padding: 0.5em 0;
  margin-right: 0.5em;
`;

const PageLink = ({ to, children }: { to: string; children: string }) => (
  <PageListItem>
    <Link to={to}>{children}</Link>
  </PageListItem>
);

const Head = () => (
  <Header>
    <Title>TinyBaker Web!</Title>
    <nav>
      <PageList>
        <PageLink to="/">Transforms</PageLink>
        <PageLink to="/jobs">Jobs</PageLink>
      </PageList>
    </nav>
  </Header>
);

export default Head;
