//import CashPayment from "../components/Pages/CreateOrder/Images/cash-payment.png";
//import OnlinePayment from "../components/Pages/CreateOrder/Images/online-payment.jpg";
//import NoCashPayment from "../components/Pages/CreateOrder/Images/no-cash-payment.png";

export const ButtonsPayment = {
  optionButtons: [
    {
      id: 0,
      urlImage: "",
      title: "Наличный расчёт",
      desc: "Оплата при получении"
    },
    {
      id: 1,
      urlImage: "",
      title: "Онлайн оплата",
      desc: "Картами Visa, MasterCard и др."
    },
    {
      id: 2,
      urlImage: "",
      title: "Безналичный расчёт",
      desc: "Для юр. лиц"
    }
  ],
  classesButtons: {
    activeBTNClass: "btn-payment-active",
    notActiveBTNClass: "btn-payment",
    activeTITLEClass: "title-payment-active",
    notActiveTITLEClass: "title-payment",
    activeDESCCLass: "desc-payment-active",
    notActiveDESCClass: "desc-payment"
  }
}
