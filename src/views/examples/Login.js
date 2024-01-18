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
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('')

  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/rest/auth/login', {email,password});
      const authToken = response.data.token;

      localStorage.setItem('authToken', authToken);
      window.location.href = '/admin/index'
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed');
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <h3 className="text-center text-muted"> LOGIN </h3>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-4">
            <Form  onSubmit={handleLogin}>
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
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                </div>) : (<span></span>)
              }
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
