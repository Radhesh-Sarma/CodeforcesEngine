import React ,{Component}from 'react';
import './App.css';
import axios from 'axios';
import { Form ,Button,Container,Table,Jumbotron} from 'react-bootstrap';



class App extends Component {

  state = {
    searchText:null,
    searchresults :[],
  }

  updateInputValue(evt) {
    this.setState({
      searchText: evt.target.value
    });
  }


  onSubmit(evt) {
    const data = {data : this.state.searchText};
    axios.post(`http://127.0.0.1:5000/`,data)
    .then(res => {this.setState( {searchresults: res["data"]["answer"]})})

 

  }


  render(){
    return (
    
      <div className="App">
              <div className ="Heading">
                              <Jumbotron fluid>
                    <Container>
                      <h1>Welcome to Codeforces Search Engine</h1>
    
                    </Container>
                  </Jumbotron>
              </div>
              <Container>
  <Form>
    <Form.Group >
      <Form.Label><h2>Search Engine</h2></Form.Label>
      <Form.Control value = {this.state.searchText} onChange={evt => this.updateInputValue(evt)} placeholder="Search Here" />
    </Form.Group>
    <Button variant="primary" size="lg" onClick = {evt => this.onSubmit(evt)} >
      Submit
    </Button>
  </Form>
  </Container>
  
  <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Problem</th>
      </tr>
    </thead>
    <tbody>

      {this.state.searchresults.map((item,index) => (
        <tr>
          <td>{index+1}</td>
          <td><a href = {"https://codeforces.com/problemset/problem/" + item[0] + item[1] + item[2] + item[3] + "/" + item[5]}>{item}</a></td>
          </tr>
      ))}
    </tbody>
  </Table>
      </div>
    );
  }
};

export default App;

