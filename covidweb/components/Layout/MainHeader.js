import Link from "next/link"
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

function MainHeader(){
    return(
    <Navbar bg="primary" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Covid Room Monitor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
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