import Link from "next/link"
// https://react-bootstrap.github.io/components/table/
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';


// This function creates the Navagation Bar at the top of the web page
function MainHeader(){
    return(
    <Navbar bg="primary" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Covid Room Monitor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
                {/*
                This passHref pass on the Link ref of NextJS to the Nav.Link of React-bootstrap
                https://github.com/react-bootstrap/react-bootstrap/issues/4131#issuecomment-566139677
                */}
                <Link href="/" passHref>
                    <Nav.Link>Home</Nav.Link>
                </Link>
                <NavDropdown title="Data Graphs 24H Period" id="basic-nav-dropdown">
                    <Link href="/CarbonData24Hour" passHref>
                        <NavDropdown.Item>Carbon Dioxide 24h Data</NavDropdown.Item>
                    </Link>
                    <Link href="/CarbonData24HourAverage" passHref>
                        <NavDropdown.Item>Carbon Dioxide 24h Average</NavDropdown.Item>
                    </Link>
                </NavDropdown>
                <NavDropdown title="Data Graphs Weekly Period" id="basic-nav-dropdown">
                    <Link href="/CarbonDataWeekly" passHref>
                        <NavDropdown.Item>Carbon Dioxide Weekly Data</NavDropdown.Item>
                    </Link>
                    <Link href="/CarbonDataWeeklyAverage" passHref>
                        <NavDropdown.Item>Carbon Dioxide Weekly Average Data</NavDropdown.Item>
                    </Link>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default MainHeader;