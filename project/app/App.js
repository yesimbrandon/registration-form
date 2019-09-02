import React, { useState } from 'react';
import { Container, Button, Card } from 'reactstrap';
import PageHeader from '@availity/page-header';
import { Form, Field } from '@availity/form';
import * as yup from 'yup';
import Footer from './components/Footer';
import MemberInfo from './components/MemberInfo';

const getQueryString = pathname => pathname.substring(pathname.lastIndexOf('?'), pathname.length);

const schema = yup.object().shape({
  firstName: yup
    .string()
    .isRequired(true, 'This Field is Required.'),
  lastName: yup
    .string()
    .isRequired(true, 'This Field is Required.'),
  npiNumber: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\d{10}/, 'Valid NPI Number is a 10-digit number'),
  businessAddress: yup
    .string()
    .isRequired(true, 'This Field is Required.'),
  phone: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\d{3}-\d{3}-\d{4}|\(\d{3}\)\s\d{3}-\d{4}|\d{10}/, 'Valid Phone Formats: 123-456-7890, (123) 456-7890, 1234567890'),
  email: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  today: yup
    .string()
});

export default () => {

  function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    return mm + '/' + dd + '/' + yyyy;
  }

  const [userRegInfo, setUserRegInfo] = useState(null);

  return (
    <Container data-testid="sso-container" className="container-sm">      
        <PageHeader appName="User Registration" />
        {!userRegInfo ? (
        <Card body>
            <Form
              initialValues={{
                firstName: '',
                lastName: '',
                npiNumber: '',
                businessAddress: '',
                phone: '',
                email: '',
                today: getDate(),
              }}
              validationSchema={schema}
              onSubmit={async (value) => await setUserRegInfo({value})}                                        
            >
              <Field name="firstName" type="text" label="First Name" />
              <Field name="lastName" type="text" label="Last Name" />
              <Field name="npiNumber" type="text" label="NPI Number" />
              <Field name="businessAddress" type="text" label="Business Address" />                            
              <Field name="phone" type="text" label="Phone" />
              <Field name="email" type="text" label="Email Address" />

              <Button type="submit" color="primary" className="float-right">
                Submit
              </Button>
            </Form>
          </Card>   
          ):(
            <>
              <MemberInfo userRegInfo={userRegInfo} isFlippable={false}/>
              <div className="d-flex justify-content-end">
              <Button className="mt-3" onClick={() => setUserRegInfo(null)} color="primary">
                Go Back
              </Button>
            </div>
            </>
          )}
      <Footer />
    </Container>
  );
};
