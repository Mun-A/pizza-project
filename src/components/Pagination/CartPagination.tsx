import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import { CartItem as CartItemType } from '../../redux/cart/types';

import styles from "./Pagination.module.scss";

type CartPaginationProps = {
  items: CartItemType[];
  currentPage: number;
  setCurrentItems: (items: CartItemType[]) => void;
};

const CartPagination: React.FC<CartPaginationProps> = ({
  items,
  currentPage,
  setCurrentItems
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(items.length / 5));

  useEffect(() => {
    const endOffset = itemOffset + 5;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / 5));
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, items]);

  const onChangePage = (event: any) => {
    const newOffset = (event.selected * 5) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onChangePage}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      // forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default CartPagination;
