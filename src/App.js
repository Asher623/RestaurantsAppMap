
import './App.css';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from "react-router-dom";
import About from './About';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import NotFound from './NotFound';
import {useState} from 'react';

function App() {
  let history = useHistory();
  const [searchString, setSearchString] = useState("");
  function handleSubmit(e){
    e.preventDefault();
    if(searchString != ""){
      history.push(`/restaurants?borough=${searchString}`)
    }
    else{
      history.push(`/restaurants`)
    }
    
  }
  return (
    <>
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>New York Restaurants</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/restaurants">
            <Nav.Link>Full List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form onSubmit={handleSubmit} inline>
          <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <br />

    <Container>
     <Row>
      <Col>
      <Switch>
        <Route exact path="/" render={()=>(<Redirect to="/restaurants" />)} />
        <Route exact path="/about" render={()=>(<About />)} />
        <Route exact path="/restaurants" render={(props)=>(<Restaurants query={props.location.search}/>)} />
        <Route path="/Restaurant/:id" render={(props)=>(<Restaurant id={props.match.params.id} />)} />
        <Route render={()=>(<NotFound />)} />
      </Switch>

      </Col>
     </Row>
    </Container>
</>
  );
}

export default App;
