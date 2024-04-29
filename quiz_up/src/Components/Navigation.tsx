import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';


type NavigationProps = {
    isLoggedIn: boolean; 
    logUserOut: () => void; 
}

export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps): JSX.Element {


    return (
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>Quiz App</Navbar.Brand> 
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? ( 
                            <>
                                <Nav.Link href='/'>Create Question</Nav.Link> 
                                <Nav.Link as={Link} to='/my-questions'>My Questions</Nav.Link> 
                                <Nav.Link as={Link} to='/user'>Edit User</Nav.Link> 
                                <Nav.Link as={Link} to='/' onClick={()=> logUserOut()} href='/'>Log Out</Nav.Link> 
                            </>
                        ) : ( 
                            <>
                                <Nav.Link as={Link} to='/register'>Register Account</Nav.Link> 
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link> 
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}