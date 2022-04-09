import styles from '../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
// import mainLogo from '../../public/imaginated_logo.png'

export default function Header() {
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
        </Row>
        </Container>
    </div>
  )
}