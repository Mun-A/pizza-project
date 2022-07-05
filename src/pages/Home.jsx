import { useContext } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // fetch(
    //   `https://62c1bb412af60be89eccccb4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setItems(data);
    //     setIsLoading(false);
    //   });
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://62c1bb412af60be89eccccb4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
