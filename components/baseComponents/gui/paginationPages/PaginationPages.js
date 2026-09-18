import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import ReactPaginate from "react-paginate";
import styles from "./PaginationPages.module.scss";

export default function PaginationPages({className, children, itemsPerPage = 4}) {
  const items = Array.from({length: 50}, (_, index) => 1 + index);

  function Items({currentItems}) {
    return (
      <div className={classNames(styles.paginationPages__items)}>
        {currentItems?.map((item, i) => (
          <h3 key={`item-${i}`}>Item #{item}</h3>
        ))}
      </div>
    );
  }

  function PaginatedItems({itemsPerPage}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = event => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };
    return (
      <div className={classNames(className, styles.paginationPages)}>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          containerClassName={classNames(styles.paginationPages__list)}
          pageClassName={classNames(styles.paginationPages__item)}
          activeClassName={classNames(styles.paginationPages__item, styles.paginationPages__item_active)}
          previousClassName={classNames(styles.paginationPages__button, styles.paginationPages__button_prev)}
          nextClassName={classNames(styles.paginationPages__button, styles.paginationPages__button_next)}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }

  return <PaginatedItems itemsPerPage={itemsPerPage} />;
}
PaginationPages.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
