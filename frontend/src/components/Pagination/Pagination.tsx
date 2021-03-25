import React from 'react'; 
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    instancesPerPage: number,
    totalInstances: number,
    paginate: any,
  }

const Pagination_main = () => { 
    return ( 
        <>
             <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={50}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    containerClassName={"pagination"}
                    activeClassName={"active"} />

        </>
    );
};

export default Pagination_main;