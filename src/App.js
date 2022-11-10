import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "./store/Slices/createUserSlice";
import {fetchCities} from "./store/Slices/citySlice";
import {fetchProducts} from "./store/Slices/productsSlice";
import {setCurrentUser} from "./store/Slices/currentUserSlice";
import './App.css';
import "./FontStyles/fonts.css";
import "./styles/GlobalStyles/index.css";
import "./styles/ResetBootstrapStyles/reset.css";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import DeliveryInfo from "./components/Pages/DeliveryInfo/DeliveryInfo";
import PaymentInfo from "./components/Pages/PaymentInfo/PaymentInfo";
import ExchangeAndReturnsInfo from "./components/Pages/ExchangeAndReturnsInfo/ExchangeAndReturnsInfo";
import NotFoundPage from "./components/Pages/NotFoundPage/NotFoundPage";
import Layout from "./components/Layout/Layout";
import Novelties from "./components/Pages/Novelties/Novelties";
import Discounts from "./components/Pages/Discounts/Discounts";
import Contacts from "./components/Pages/Contacts/Contacts";
import TeaWholesale from "./components/Pages/TeaWholesale/TeaWholesale";
import CoffeeWholesale from "./components/Pages/CoffeeWholesale/CoffeeWholesale";
import CookwareWholesale from "./components/Pages/CookwareWholesale/CookwareWholesale";
import TeaProduction from "./components/Pages/TeaProduction/TeaProduction";
import Certificates from "./components/Pages/Certificates/Certificates";
import WishList from "./components/Pages/WishList/WishList";
import Compare from "./components/Pages/Compare/Compare";
import CategoryTea from "./components/Pages/CategoriesNavbarsPages/CategoryTea/CategoryTea";
import CategoryCoffee from "./components/Pages/CategoriesNavbarsPages/CategoryCoffee/CategoryCoffee";
import CategoryMate from "./components/Pages/CategoriesNavbarsPages/CategoryMate/CategoryMate";
import CategorySweets from "./components/Pages/CategoriesNavbarsPages/CategorySweets/CategorySweets";
import CategoryWare from "./components/Pages/CategoriesNavbarsPages/CategoryWare/CategoryWare";
import CategoryStorage from "./components/Pages/CategoriesNavbarsPages/CategoryStorage/CategoryStorage";
import Register from "./components/Pages/Auth/Register/Register";
import Login from "./components/Pages/Auth/Login/Login";
import Profile from "./components/Pages/Auth/Profile/Profile";
import DeliveryOnMoscowAndRussia
  from "./components/Pages/Information/DeliveryOnMoscowAndRussia/DeliveryOnMoscowAndRussia";
import BestGuarantee from "./components/Pages/Information/BestGuarantee/BestGuarantee";
import LoyaltyProgram from "./components/Pages/Information/LoyaltyProgram/LoyaltyProgram";
import PopularCategoriesPage from "./components/Pages/PopularCategoriesPage/PopularCategoriesPage";
import Dashboard from "./components/AdminsPages/Dashboard/Dashboard";
import RouteMenuProducts from "./components/AdminsPages/RouteMenuProducts/RouteMenuProducts";
import Categories from "./components/AdminsPages/CreateProducts/Categories";
import SinglePageShowProduct
  from "./components/Pages/CategoriesNavbarsPages/SinglePageShowProduct/SinglePageShowProduct";
import Tables from "./components/AdminsPages/Tables/Tables";
import TeaEditPage from "./components/AdminsPages/Tables/Edit/TeaEditPage";
import TeaPage from "./components/AdminsPages/Tables/TablePages/Products/TeaPage";
import CoffeePage from "./components/AdminsPages/Tables/TablePages/Products/CoffeePage";
import MatePage from "./components/AdminsPages/Tables/TablePages/Products/MatePage";
import SweetsPage from "./components/AdminsPages/Tables/TablePages/Products/SweetsPage";
import CookWarePage from "./components/AdminsPages/Tables/TablePages/Products/CookWarePage";
import StoragePage from "./components/AdminsPages/Tables/TablePages/Products/StoragePage";
import AllUsersPage from "./components/AdminsPages/Tables/TablePages/Users/AllUsersPage";
import UserEditPage from "./components/EditData/UserEditPage";
import RegisterOneClick from "./components/Pages/Auth/RegisterOneClick/RegisterOneClick";
import Cart from "./components/Cart/Cart.js";
import {useAuth} from "./hooks/use-auth";
import {useCart} from "react-use-cart";
import CreateOrder from "./components/Pages/CreateOrder/CreateOrder";
import OptionProfilePage from "./components/Pages/Auth/OptionProfilePage/OptionProfilePage";
import EditUserCustomPage from "./components/Pages/Auth/EditUserCustomPage/EditUserCustomPage";
import EditUserConfidencialPage from "./components/Pages/Auth/EditUserConfidencialPage/EditUserConfidencialPage";
import {fetchCertificates} from "./store/Slices/certificateSlice";


function App() {
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.productList);
  const usersData = useSelector(state => state.usersList.usersData);
  const {isAuth, permission} = useAuth();
  const parseCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const {emptyCart, totalUniqueItems} = useCart();

  useEffect(() => {
    dispatch(fetchProducts());
    // dispatch(fetchUsers());
    // dispatch(fetchCities());
    // dispatch(fetchCertificates())
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {//если не авторизирован
      if (localStorage.getItem("currentUser") !== "{}") {
        usersData.map((user) => {
          if (user.email === JSON.parse(localStorage.getItem("currentUser")).email) {
            const findUser = usersData.find(user => user.email === parseCurrentUser.email);
            dispatch(setCurrentUser(findUser));
          }
        })
      }
    }
  })

  if (permission.isGuest === true) {
    if (totalUniqueItems !== 0) {
      emptyCart()
    }
  }

  return (
    <>
      {status === "loading" && console.log("Loading products...")}
      {error !== "null" ? console.log(error) : ""}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/*navbar info dropdown */}
          <Route path="delivery" element={<DeliveryInfo />} />
          <Route path="payment" element={<PaymentInfo />} />
          <Route path="exchange" element={<ExchangeAndReturnsInfo />} />
          {/*navbar logo content nav links*/}
          <Route path="novelties" element={<Novelties />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="contacts" element={<Contacts />} />
          {/*navbar logo content dropdown*/}
          <Route path="tea-wholesale" element={<TeaWholesale />} />
          <Route path="coffee-wholesale" element={<CoffeeWholesale />} />
          <Route path="ware-wholesale" element={<CookwareWholesale />} />
          <Route path="tea-production" element={<TeaProduction />} />
          <Route path="certificates" element={<Certificates />} />
          {/*navbar logo content buttons link*/}
          <Route path="wishlist" element={<WishList />} />
          <Route path="compare" element={<Compare />} />
          {/*Not found pages*/}
          <Route path="*" element={<NotFoundPage />} />
          {/*navbar search category links*/}
          <Route path="category-tea" element={<CategoryTea />} />
          <Route path="category-tea/:id" element={<SinglePageShowProduct />} />
          <Route path="category-coffee" element={<CategoryCoffee />} />
          <Route path="category-mate" element={<CategoryMate />} />
          <Route path="category-sweets" element={<CategorySweets />} />
          <Route path="category-ware" element={<CategoryWare />} />
          <Route path="category-storage" element={<CategoryStorage />} />
          {/*auth*/}
          <Route path="register" element={<Register />}/>
          <Route path="register-one-click" element={<RegisterOneClick />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          {/*Profile*/}
          <Route path="profile/edit-user/:id" element={<UserEditPage />} />
          <Route path="profile/option-profile/" element={<OptionProfilePage />} />
          <Route path="profile/option-profile/edit-user-custom-data/:id" element={<EditUserCustomPage />} />
          <Route path="profile/option-profile/edit-user-confidencial-data/:id" element={<EditUserConfidencialPage />} />
          {/*Info content*/}
          <Route path="delivery-on-moscow-and-russia-free" element={<DeliveryOnMoscowAndRussia />} />
          <Route path="best-guarantee" element={<BestGuarantee />} />
          <Route path="loyalty-program" element={<LoyaltyProgram />} />
          {/*Page Home*/}
          <Route path="popular-categories" element={<PopularCategoriesPage />} />
          {/*AdminsPanel*/}
          <Route path="admin-dashboard" element={<Dashboard />} />
          <Route path="admin-dashboard/create-product-category" element={<Categories />} />
          <Route path="admin-dashboard/create-product-category/:category" element={<RouteMenuProducts />} />
          <Route path="admin-dashboard/tables" element={<Tables />} />
          {/*Tables Pages*/}
          <Route path="admin-dashboard/tables/tea" element={<TeaPage />} />
          <Route path="admin-dashboard/tables/tea/edit-tea/:id" element={<TeaEditPage />} />
          <Route path="admin-dashboard/tables/coffee" element={<CoffeePage />} />
          <Route path="admin-dashboard/tables/mate" element={<MatePage />} />
          <Route path="admin-dashboard/tables/sweets" element={<SweetsPage />} />
          <Route path="admin-dashboard/tables/cookware" element={<CookWarePage />} />
          <Route path="admin-dashboard/tables/storage" element={<StoragePage />} />
          <Route path="admin-dashboard/tables/users" element={<AllUsersPage />} />
          <Route path="admin-dashboard/tables/users/edit-user/:id" element={<UserEditPage />} />
          {/*Cart*/}
          <Route path="cart" element={<Cart />} />
          <Route path="cart/create-order" element={<CreateOrder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
