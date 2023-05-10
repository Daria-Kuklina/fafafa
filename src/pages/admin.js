import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"
import { getData, postData } from "../utils/network";
import "../index.css"

const UserCard = ({ user, deleteUser }) => {
    return (
        <Row>
            <Col>
                <p>{user.name}</p>
            </Col>
            <Col>
                <p>{user.login}</p>
            </Col>
            <Col>
                <p>{user.email}</p>
            </Col>
            <Col>
                <p>{user.role}</p>
            </Col>
            <Col>
                <Button

                    onClick={() => deleteUser(user.id)}
                    style={{ width: '50px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }}
                >x</Button>
            </Col>
        </Row>
    )
}


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userList, setUserList] = useState(false)
    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getUserList() {
        const { success, users, message } = await getData('/users/list')
        if (!success) return alert(message);
        return setUserList(users)
    }
    async function deleteUser(userId) {
        const { success, message } = await postData("/users/del", { userId });
        if (!success) return alert(message)
        await getUserList()
        return alert(message)
    }
    useEffect(() => {
        getUserList()
        getUserData()
    }, [])

    return (
        <Container>
            {isAdmin &&
                <>
                    <h1 >Админ панель</h1>

                    <Row className="table-admin">
                        <Col>
                            <h3 style={{ textAlign: 'center', }}>Имя</h3>
                        </Col>
                        <Col>
                            <h3 style={{ textAlign: 'center', }}>Логин</h3>
                        </Col>
                        <Col>
                            <h3 style={{ textAlign: 'center', }}>Почта</h3>
                        </Col>
                        <Col>
                            <h3 style={{ textAlign: 'center', }}>Роль</h3>
                        </Col>
                        <Col>
                            <h3 style={{ textAlign: 'center', }}>Удалить</h3>
                        </Col>
                    </Row>
                    <Row className="table-admin">
                        {userList ?
                            userList.map((user) => <UserCard
                                key={user.id}
                                user={user}
                                isAdmin={isAdmin}
                                getUserList={getUserList}
                                deleteUser={deleteUser}
                            />
                            )
                            :
                            <p>Позьзователи отсутствуют.</p>
                        }</Row>
                    <br />
                </>
            }
        </Container>
    )
}
export default Admin