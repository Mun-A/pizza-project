import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PizzaLoader } from "../components";
import { selectCartItem } from "../redux/cart/selectors";
import { addItem } from '../redux/cart/slice';
import { CartItem as CartItemType } from "../redux/cart/types";
import { Pizza } from '../redux/pizza/types';

const typeNames = ["тонкое", "традиционное"];

const PizzaDetail: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [addedCount, setAddedCount] = useState<number>();

  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItem(id ? id : '', typeNames[activeType], pizza ? pizza.sizes[activeSize] : 0));


  useEffect(() => {    
    setAddedCount(cartItem?.count);
  }, [activeSize, activeType, cartItem]);

  const onClickChangeType = (index: number) => {
    setActiveType(index);
  };

  const onClickChangeSize = (index: number) => {
    setActiveSize(index);
  };

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62c1bb412af60be89eccccb4.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы.");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <PizzaLoader />;
  }

  const onClickAdd = () => {
    const item: CartItemType = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="container">
      <div className="pizza-detail">
        <div className="pizza-detail__img">
          <img src={pizza.imageUrl} alt={pizza.title} />
        </div>
        <div className="pizza-detail__info">
          <h2>{pizza.title}</h2>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((type, index) => (
                <li
                  key={typeNames[type]}
                  onClick={() => onClickChangeType(index)}
                  className={activeType === index ? "active" : ""}
                >
                  {typeNames[type]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, index) => (
                <li
                  key={size}
                  onClick={() => onClickChangeSize(index)}
                  className={activeSize === index ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {pizza.price} ₽</div>
            <button
              className="button button--outline button--add"
              onClick={onClickAdd}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedCount && <i>{addedCount}</i>}
            </button>
          </div>
          <Link to="/" className='pizza-detail__link'>
            <button className="button button--outline button--add">
              <span>На главную</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
