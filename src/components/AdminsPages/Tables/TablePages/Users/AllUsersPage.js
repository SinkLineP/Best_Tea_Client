import React from 'react';
import {Link} from "react-router-dom";
import {Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
  togglePermsGuest,
  togglePermsManager,
  togglePermsAdmin,
  togglePermsUser,
  deleteOneUser
} from "store/Slices/createUserSlice";
import {MdDeleteForever} from "react-icons/md";
import {BiEdit} from "react-icons/bi";

const AllUsersPage = () => {
  const usersData = useSelector(state => state.usersList.usersData);
  const dispatch = useDispatch();

  const handleCheckIsHave = (peopleInfo, option) => {
    if (peopleInfo !== null && peopleInfo.length >= 1) {
      if (option === "name") {
        return peopleInfo[0].toUpperCase() + peopleInfo.slice(1);
      }
      if (option === "people-info") {
        return peopleInfo[0].toUpperCase();
      }
      return peopleInfo;
    } else {
      return "-";
    }
  }

  return (
    <>
      <Link to={"/admin-dashboard/tables"}>Вернуться к списку таблиц</Link>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Почта</th>
          <th>Пароль</th>
          <th>Телефон</th>
          <th>Ф.И.О</th>
          <th>Токен</th>
          <th>Права Администратора</th>
          <th>Права Менеджера</th>
          <th>Права Пользователя</th>
          <th>Права Гостя</th>
          <th>Редактирование</th>
          <th>Удаление</th>
        </tr>
        </thead>
        <tbody>
        {
          usersData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{handleCheckIsHave(item.email)}</td>
                <td>{handleCheckIsHave(item.password)}</td>
                <td>{handleCheckIsHave(item.phone)}</td>
                <td>
                  {handleCheckIsHave(item.surname, "name")}.
                  {handleCheckIsHave(item.name, "people-info")}.
                  {handleCheckIsHave(item.lastname, "people-info")}
                </td>
                <td>{handleCheckIsHave(item.token)}</td>
                <td><input type="checkbox" defaultChecked={item.permission.isAdmin} onChange={() => dispatch(togglePermsAdmin(item.id))}/></td>
                <td><input type="checkbox" defaultChecked={item.permission.isManager} onChange={() => dispatch(togglePermsManager(item.id))}/></td>
                <td><input type="checkbox" defaultChecked={item.permission.isUser} onChange={() => dispatch(togglePermsUser(item.id))}/></td>
                <td><input type="checkbox" defaultChecked={item.permission.isGuest} onChange={() => dispatch(togglePermsGuest(item.id))}/></td>
                <td><Link to={`edit-user/${item.id}`}><Button variant={"outline-primary"}><BiEdit /></Button></Link></td>
                <td><Button variant={"outline-danger"} onClick={() => dispatch(deleteOneUser(item.id))}><MdDeleteForever /></Button></td>
               </tr>
            )
          })
        }
        </tbody>
      </Table>
    </>
  );
};

export default AllUsersPage;