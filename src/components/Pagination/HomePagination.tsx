import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type HomePaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const HomePagination: React.FC<HomePaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default HomePagination;
