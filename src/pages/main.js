import { Row, Col, Button, Carousel, Card } from "react-bootstrap"
import Toy from "../components/Toy1";
import { Canvas } from 'react-three-fiber'

const Main = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("../assets/slider1.png")}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("../assets/slider3.jpg")}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("../assets/slider2.jpg")}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <br />
            {/* <Canvas
                camera={{
                    fov: 90,
                    position: [0, 0, 3],
                }}
            >
                <ambientLight intensity={0.1} />
                <directionalLight position={[1, 1, 1]} intensity={0.8} />
              
                <Toy />
            </Canvas> */}

            <Row style={{ marginLeft: "10%", marginRight: 0, fontSize: "18px" }}>
                <h3>Мы рады приветствовать Вас в интернет-магазине детских игрушек Mister Toyland!</h3>
                <p>
                    Более 10-ти лет наша компания занимается реализацией товаров и игрушек для детей — все,
                    что необходимо для полноценного развития ребенка.
                </p>
            </Row>
            <Row style={{ marginLeft: "10%", marginRight: 0, fontSize: "18px" }}>
                <Col xs={12} sm={6}>
                    <h4>Почему выбирают наш интернет-магазин?</h4>
                    <ul>
                        <li>
                            <h5>Широкий ассортимент. </h5>
                            Мы предлагаем широкий ассортимент игрушек и товаров для детей,
                            который постоянно пополняется. Здесь Вы найдете всю необходимую
                            продукцию для интеллектуального и физического развития своего
                            ребенка.
                        </li>
                        <li>
                            <h5>Высокое качество продукции. </h5>
                            Наши игрушки и товары выполнены из экологичных и
                            гипоаллергенных материалов, полностью безопасны для детей.
                        </li>
                        <li>
                            <h5>Выгодные цены. </h5>
                            На нашем сайте Вы можете купить игрушку во Владимире по
                            самым выгодным ценам!
                        </li>
                        <li>
                            <h5>Удобство заказа. </h5>
                            Вы можете оформить свой заказ по телефону 8-800-555-35-35
                            оставив свои контактные данные и забрать его в любом нашем магазине.
                            Mister Toyland работает для Вас с 8:00 до 20:00.
                        </li>
                        <li>
                            <h5>Доставка.</h5>
                            По вашему желанию возможна платная доставка (100 руб.) в пределах города.
                        </li>
                    </ul>

                </Col>
                <Col xs={12} sm={6}>
                    <Card.Img style={{ width: '80%' }} src={require("../assets/name.png")} />
                </Col>
            </Row>
            <br />
        </>);
};

export default Main
