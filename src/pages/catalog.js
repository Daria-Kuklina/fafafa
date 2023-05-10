import { useContext, useEffect, useState } from "react";
import { Grid3x2GapFill, BorderWidth, BoxArrowRight } from 'react-bootstrap-icons';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import AdminAddToysdModal from "../components/AdminAddToyModal";
import AdminEditToysdModal from "../components/AdminEditToyModal";
import { cartContext } from '../templates/page';
import { getData, postData } from "../utils/network";
import useToken from "../hooks/useToken";


const ToyCard1 = ({ toy, isAdmin, getToyList, handleAdd, deleteToy }) => {
    const { loggedIn } = useToken();
    const [editModalShow, setEditModalShow] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(false)

    function getPhoto() {
        getData(`/photos/one/${toy.photo_id}`).then(({ success, photo }) => {
            if (success) return setPhotoUrl(photo.photo_path)
        })
    }

    useEffect(() => {
        getPhoto()
    }, [])
    return (
        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <Button as={Link} to={`${toy.id}`} variant="primary" >
                    <Card.Img
                        style={{ width: '100%' }}
                        src={photoUrl}
                    />
                </Button>
                <h2 class="hr-line1">{toy.name}</h2 >
                <p style={{ textAlign: 'left', }}>Цена: {toy.price}₽.</p>

                {isAdmin ?
                    (<>
                        <AdminEditToysdModal
                            show={editModalShow}
                            toyData={toy}
                            getToyList={getToyList}
                            onHide={() => setEditModalShow(false)}
                        />
                        <Container>
                            <Button

                                onClick={() => setEditModalShow(true)}
                                style={{ width: '150px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }}
                            >Изменить</Button>
                            <Button

                                onClick={() => deleteToy(toy.id)}
                                style={{ width: '150px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }}
                            >Удалить</Button>
                        </Container>
                    </>
                    )
                    :
                    (
                        <>
                            {!loggedIn ?
                                (<Button
                                    className="w-100"
                                    as={Link} to="/avtoriz/login"
                                >Купить</Button>)
                                :
                                (
                                    <Button
                                        className="w-100"
                                        onClick={() => handleAdd(toy.id)}
                                    >Купить</Button>)
                            }
                        </>



                    )
                }
            </Card.Body>
        </Card>
    )
}

const ToyCard2 = ({ toy, isAdmin, getToyList, handleAdd, deleteToy }) => {
    const { loggedIn } = useToken();
    const [editModalShow, setEditModalShow] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(false)

    function getPhoto() {
        getData(`/photos/one/${toy.photo_id}`).then(({ success, photo }) => {
            if (success) return setPhotoUrl(photo.photo_path)
        })
    }

    useEffect(() => {
        getPhoto()
    }, [])
    return (
        <Card style={{ width: "100%" }}>
            <Row>
                <Col>
                    <Button as={Link} to={`${toy.id}`} variant="primary" >
                        <Card.Img
                            style={{ width: '100%' }}
                            src={photoUrl}
                        />
                    </Button>
                </Col>
                <Col>
                    <Card.Body>
                        <h2 class="hr-line1">{toy.name}</h2 >
                        <p style={{ textAlign: 'left', }}>Фирма: {toy.firm}</p>
                        <p style={{ textAlign: 'left', }}>Страна производитель: {toy.producing_country}</p>
                        <p style={{ textAlign: 'left', }}>Цена товара: {toy.price} ₽.</p>
                        {isAdmin ?
                            (<>
                                <AdminEditToysdModal
                                    show={editModalShow}
                                    toyData={toy}
                                    getToyList={getToyList}
                                    onHide={() => setEditModalShow(false)}
                                />
                                <Container>
                                    <Button

                                        onClick={() => setEditModalShow(true)}
                                        style={{ marginRight: '10%', width: '150px' }}
                                    >Изменить</Button>
                                    <Button

                                        onClick={() => deleteToy(toy.id)}
                                        style={{ margin: 0, width: '150px' }}
                                    >Удалить</Button>
                                </Container>
                            </>
                            )
                            :
                            (
                                <>
                                    {!loggedIn ?
                                        (<Button
                                            className="w-100"
                                            as={Link} to="/avtoriz/login"
                                        >Купить</Button>)
                                        :
                                        (
                                            <Button
                                                className="w-100"
                                                onClick={() => handleAdd(toy.id)}
                                            >Купить</Button>)
                                    }
                                </>



                            )
                        }
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

const Buy = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [toyList, setToyList] = useState(false)
    const { cartList, setCartList } = useContext(cartContext);
    const [changeSize, setChangeSize] = useState(false);


    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getToyList() {
        const { success, toys, message } = await getData('/toys/list')
        if (!success) return alert(message);
        console.log(toys.filter(el => 0 === 0))
        return setToyList(toys)

    }

    function handleAdd(itemId) {
        const candidate = cartList.findIndex(item => item.id === itemId)
        if (candidate >= 0) {
            const updatedCart = [...cartList]
            updatedCart[candidate].amount += 1
            setCartList(updatedCart)

        }
        else {
            setCartList(prev => [...prev, { id: itemId, amount: 1 }])
        }
    }

    async function deleteToy(toyId) {
        const { success, message } = await postData("/toys/del", { toyId });
        if (!success) return alert(message)
        await getToyList()
        return alert(message)
    }

    useEffect(() => {
        getToyList()
        getUserData()
    }, [])
    return (
        <Container>
            <h1 className="pt-3">Каталог</h1>
            {isAdmin &&
                <>
                    <AdminAddToysdModal
                        show={addModalShow}
                        getToyList={getToyList}
                        onHide={() => setAddModalShow(false)}
                    />
                    <Button
                        variant="primary"
                        onClick={() => setAddModalShow(true)}
                    >Добавить товар</Button>
                </>
            }
            <Button onClick={() => setChangeSize(false)} style={{ margin: "5px" }}><Grid3x2GapFill size={35} /></Button>
            <Button onClick={() => setChangeSize(true)} style={{ margin: "5px" }}><BorderWidth size={35} /></Button>

            <Container className="w-80"><br />
                {changeSize == false ?
                    (
                        <Row>
                            {toyList ?
                                (
                                    toyList.map((toy) =>
                                        <Col><ToyCard1
                                            key={toy.id}
                                            toy={toy}
                                            isAdmin={isAdmin}
                                            getToyList={getToyList}
                                            handleAdd={handleAdd}
                                            deleteToy={deleteToy}
                                        /></Col>

                                    )


                                )
                                :
                                (<p>В данный момент товары отсутствуют, загляните в каталог позже.</p>)
                            }
                        </Row>
                    )
                    :
                    (
                        <>
                            {toyList ?
                                toyList.map((toy) => <ToyCard2
                                    key={toy.id}
                                    toy={toy}
                                    isAdmin={isAdmin}
                                    getToyList={getToyList}
                                    handleAdd={handleAdd}
                                    deleteToy={deleteToy}
                                />
                                )
                                :
                                <p>В данный момент товары отсутствуют. </p>
                            }
                        </>
                    )
                }

            </Container>
        </Container>
    )
}
export default Buy
