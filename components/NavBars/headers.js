import styles from '../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
// import mainLogo from '../../public/imaginated_logo.png'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const {data} = useSession()

  return (
    <div className={styles.headerContainer}>
        <Container className={styles.MainRowNav}>
        <Row>
        <Col>
        <img className={styles.MainImage} src='/imaginated_logo.png'/>
            </Col>

            <Col className={styles.directoryNameEach}>
                About
            </Col>
            <Col className={styles.directoryNameEach}>
                Directory
            </Col>
            <Col className={styles.directoryNameEach}>
                Market
            </Col>
            <Col className={styles.directoryNameEach}>
                Claim Listing
            </Col>
            <Col>
            {!data ? (<div className={styles.directoryNameEach}>
            <button onClick={() => location.href = "/login"}>Login</button>
            </div>
            ): (<div className={styles.directoryNameEach}>
            {/* <span>{data.user.email}</span> */}

            {data.user.image && (
              <img
                src={data.user.image}
                style={{ width: "25px", borderRadius: "50%" }}
              />
            )}
            <span>{data.user.name}</span>
            {/* <button onClick={() => location.href = "/login"}>Login</button> */}
            {/* <button onClick={signOut}>Sign Out</button> */}
            </div>)}
            </Col>
        </Row>
        </Container>
    </div>
  )
}