import React, { useState } from 'react';
import api from 'services/api';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error,setError]=useState('')

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/rest/auth/login', credentials);
      const authToken = response.data.token;

      // Stocker le token dans localStorage ou state, par exemple
      localStorage.setItem('authToken', authToken);
      window.location.href = '/admin/index'
      // Ensuite, vous pouvez rediriger l'utilisateur ou faire d'autres actions nécessaires
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed');
      // Gérer les erreurs d'authentification ici
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <h3 className="text-center text-muted"> LOGIN </h3>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-4">
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup className="mb-4">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" >
                  Sign in
                </Button>
              </div>
              {error ? (
              <div className="alert alert-danger">
                {error}
              </div>):(<span></span>)
              }
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
