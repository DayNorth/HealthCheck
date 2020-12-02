import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HealthyLogo from './logoHealthy.svg';
import UnhealthyLogo from './logoUnHealthy.svg';


function App() {
  const [healthcheck, setHealcheck] = useState({ healthchecks : []});

  useEffect(() => {
    const ObtenerHealthChecks = async () => {
      
      const resultado = await axios.get("http://localhost:21899/api/health")
                              .then( respuesta => {
                                return respuesta.data;
                              })
                              .catch(error =>
                                {
                                  console.log(error);
                                });
                                setHealcheck({healthchecks: resultado.HealthChecks});
    }
    ObtenerHealthChecks();
  }, []);
  return (
    <div className="App">
      <h2>HealthCheck - DevOps</h2>
        <div className="row">
          <Container>
            <div>
              <Row xs="4" style={{padding: 50}}>
                { healthcheck.healthchecks.map((elHealthcheck, index) => (
                  <Col key={index}>
                    <Card className="tarjeta">
                      {elHealthcheck.Status === 'Healthy'? <CardImg src={HealthyLogo} style={{backgroundColor:"#2E8B57"}}/> : <CardImg src={UnhealthyLogo} style={{backgroundColor: "#B22222"}}/>}
                      <CardBody>
                        <CardTitle><b>{elHealthcheck.Componente}</b></CardTitle>
                        <CardSubtitle><b>Status: </b>{elHealthcheck.Status}</CardSubtitle>
                        <CardText>{elHealthcheck.Descripcion != null ? elHealthcheck.Descripcion : 'El servicio está funcionando correctamente' }</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                ))

                }
              </Row>
            </div>
          </Container>
        </div>
    </div>
  );
}

export default App;

//http://localhost:21899/api/health