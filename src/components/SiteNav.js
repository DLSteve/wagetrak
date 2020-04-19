import React from 'react'
import {Navbar, Button} from 'rbx'

export default function SiteNav() {
  return (
      <Navbar color="primary">
        <Navbar.Brand>
          <Navbar.Item href="/">
            <img
                src={process.env.PUBLIC_URL + '/images/wt_nav_logo.svg'}
                alt=""
                role="presentation"
                width="174"
                height="35"
            />
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Segment align="end">
            <Navbar.Item>
              <Button.Group>
                <Button color="secondary">
                  <strong>Sign up</strong>
                </Button>
                <Button color="light">Log in</Button>
              </Button.Group>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>
  )
}
