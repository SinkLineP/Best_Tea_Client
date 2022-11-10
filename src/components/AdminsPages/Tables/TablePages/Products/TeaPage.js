import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {MdDeleteForever} from "react-icons/md";
import {deleteProducts} from "store/Slices/productsSlice";


const TeaPage = () => {
  const teaProducts = useSelector(state => state.productList.teaList);
  const dispatch = useDispatch();

  return (
    <>
      <Link to={"/admin-dashboard/tables"}>Вернуться к списку таблиц</Link>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Вид</th>
          <th>Тип</th>
          <th>Артикль</th>
          <th>Арамат</th>
          <th>Форма</th>
          <th>Страна</th>
          <th>Фирма</th>
          <th>Упаковка</th>
          <th>Добавки</th>
          <th>Рейтинг</th>
          <th>Наличие</th>
          <th>Количесвто</th>
          <th>Отзывы</th>
          <th>Редакт.</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        {
          teaProducts.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.view}</td>
                <td>{item.extras}</td>
                <td>{item.type}</td>
                <td>{item.art}</td>
                <td>{item.scented}</td>
                <td>{item.formOfRelease}</td>
                <td>{item.country}</td>
                <td>{item.producer}</td>
                <td>{item.packaging}</td>
                <td>{item.composition}</td>
                <td>{item.score}</td>
                <td>{item.isStock === true ? "Есть" : "Нету"}</td>
                <td>{item.countProducts}</td>
                <td><Link to={""}>Отзывы</Link></td>
                <td><Link to={`edit-tea/${item.id}`}><Button variant={"outline-primary"}><BiEdit /></Button></Link></td>
                <td><Button variant={"outline-danger"} onClick={() => dispatch(deleteProducts(item.id))}><MdDeleteForever /></Button></td>
              </tr>
            )
          })
        }

        </tbody>
      </Table>
    </>
  );
};

export default TeaPage;