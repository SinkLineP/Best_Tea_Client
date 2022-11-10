import TeaImage from "Images/Icons/Category/teaIconBlack.svg";
import CoffeeImage from "Images/Icons/Category/coffeeIconBlack.svg";
import MateImage from "Images/Icons/Category/mateIconBlack.svg";
import SweetsImage from "Images/Icons/Category/sweetsIconBlack.svg";
import CookWareImage from "Images/Icons/Category/cookWareIconBlack.svg";
import StorageImage from "Images/Icons/Category/storageIconBlack.svg";

export const initialState = {
  firstCategory: [
    {
      id: 0,
      title: "Чай",
      icon: TeaImage,
      link: "category-tea",
      content: "И добавки к чаю",
    },
    {
      id: 1,
      title: "Кофе",
      icon: CoffeeImage,
      link: "category-coffee",
      content: "Свежеобжаренный зерновой",
    },
    {
      id: 2,
      title: "Мате",
      icon: MateImage,
      link: "category-mate",
      content: "Йерба и аксессуары",
    },
    {
      id: 3,
      title: "Сладости",
      icon: SweetsImage,
      link: "category-sweets",
      content: "Шоколад, сиропы, цукаты",
    },
    {
      id: 4,
      title: "Посуда и Аксессуары",
      icon: CookWareImage,
      link: "category-ware",
      content: "И комплектующие",
    },
    {
      id: 5,
      title: "Хранение и упаковка",
      icon: StorageImage,
      link: "category-storage",
      content: "Пакеты, банки, и др.",
    }
  ]
}


