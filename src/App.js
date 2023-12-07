import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Converter from './components/converter';

function App() {

 const containerStyle = {
   backgroundColor: '#e4ebf5' 
};

  return (
    <div className="App">
      <Container style={containerStyle} className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Row > 
          <Col xs={12} className="text-center" >
            <Header />
            <Converter />
          </Col  >
        </Row >
      </Container>
    </div>
  );
}

export default App;