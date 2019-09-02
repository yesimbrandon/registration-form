import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Row, Col, Button } from 'reactstrap';
import classNames from 'classnames';
import { SpacesLogo } from '@availity/spaces';
import FlipCard from './FlipCard';

const Item = ({ name, value, children, className, ...rest }) => (
  <div className={classNames('d-flex justify-content-between', className)} {...rest}>
    <span className="font-weight-bold text-uppercase">{name}</span>
    {children || <span>{value}</span>}
  </div>
);

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

const MemberInfo = ({ isFlippable, userRegInfo }) => (
  <FlipCard
    isFlippable={isFlippable}
    userRegInfo={userRegInfo}    
    front={({ toggle }) => (
      <Card style={{ height: 293 }}>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <SpacesLogo
            style={{ height: 40 }}
            fallback="https://www.cmsimaging.com/assets/img/brands/authpal/availity.png"
          />
          {isFlippable ? (
            <Button color="link" onClick={toggle}>
              Go To Back
            </Button>
          ) : (
            'Front'
          )}
        </CardHeader>
        <Row tag={CardBody} style={{ height: '100%' }}>
          <Col xs={5} className="border-bottom mb-2 pb-2">
            <Item name="First Name" value={userRegInfo.value.firstName} />
            <Item name="Last Name" value={userRegInfo.value.lastName} />            
          </Col>
          <Col xs={{ size: 6, offset: 1 }} className="border-bottom mb-2 pb-2">          
            <Item name="Phone Number" value={userRegInfo.value.phone} />
            <Item name="Email Address" value={userRegInfo.value.email} />
          </Col>
          <Col xs={8}>
            <Item name="FHCP NPI" value={userRegInfo.value.npiNumber} />
            <Item name="Effective" value={userRegInfo.value.today} />            
            <Item name="Business Address" value={userRegInfo.value.businessAddress} />
          </Col>
        </Row>
      </Card>
    )}
    back={({ toggle }) => (
      <Card style={{ height: 293 }}>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <SpacesLogo
            style={{ height: 40 }}
            fallback="https://www.cmsimaging.com/assets/img/brands/authpal/availity.png"
          />
          {isFlippable ? (
            <Button color="link" onClick={toggle}>
              Go To Front
            </Button>
          ) : (
            'Back'
          )}
        </CardHeader>
        <Row tag={CardBody} style={{ height: '100%' }}>
          <Col xs={8} className="mb-2 pb-2">
            <Item name="Members">
              <span className="pl-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </span>
            </Item>
          </Col>         
        </Row>
      </Card>
    )}
  />
);

MemberInfo.propTypes = {
  isFlippable: PropTypes.bool,
  userRegInfo: PropTypes.object
};

export default MemberInfo;
