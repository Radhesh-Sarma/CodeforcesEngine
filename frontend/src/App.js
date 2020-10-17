import React ,{Component}from 'react';
import './App.css';
import axios from 'axios';
import { Spinner,Card,Form ,Button,Container,Table,Jumbotron} from 'react-bootstrap';
import codeforces from './codeforces.json';



class App extends Component {

  state = {
    searchText:null,
    searchresults :[],
    loading:false,
  }

  updateInputValue(evt) {
    this.setState({
      searchText: evt.target.value
    });
  }


  onSubmit(evt) {
    this.state.loading = true;
    const data = {data : this.state.searchText};
    axios.post(`http://127.0.0.1:5000/`,data)
    .then(res => {this.setState( {searchresults: res["data"]["answer"]})})
    console.log(codeforces["result"]["problems"][1111]);
    this.state.loading = false;
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
    <Button variant="secondary" size="lg" onClick = {evt => this.onSubmit(evt)} >
      Submit
    </Button>
    <br></br>
    <br></br>
  </Form>
  <Card>
  
  <Card.Body>Search shows {this.state.searchresults.length} Results</Card.Body>
  
</Card>
<br></br>
<br></br>
  </Container>
  
  <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Problem Link</th>
        <th>Contest ID</th>
        <th>Problem Name</th>
        <th>Points</th>
        <th>Rating</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>

      {this.state.searchresults.map((item,index) => (
        <tr>
          <td>{index+1}</td>
          <td><a href = {"https://codeforces.com/problemset/problem/" + item[0] + item[1] + item[2] + item[3] + "/" + item[5]}>{item[0] + item[1] + item[2] + item[3]}</a></td>
        <td>{codeforces["result"]["problems"][parseInt(item[0] + item[1] + item[2] + item[3])]["contestId"]}</td>
        <td>{codeforces["result"]["problems"][parseInt(item[0] + item[1] + item[2] + item[3])]["name"]}</td>
        <td>{codeforces["result"]["problems"][parseInt(item[0] + item[1] + item[2] + item[3])]["points"]}</td>
        <td>{codeforces["result"]["problems"][parseInt(item[0] + item[1] + item[2] + item[3])]["rating"]}</td>
      <td>{codeforces["result"]["problems"][parseInt(item[0] + item[1] + item[2] + item[3])]["tags"].toString()}</td>
          </tr>
      ))}
    </tbody>
  </Table>
      </div>

      
    );
  }
};

export default App;

