import ReactPaginate from 'react-paginate'
import './Paginacao.css'

class PaginationComponent extends ReactPaginate {
    render() {
        const { pageCount, changePage } = this.props;
        return (
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próximo"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__item"}
                nextLinkClassName={"pagination__item"}
                disabledClassName={"pagination__item--disabled"}
                activeClassName={"pagination__item--active"}
            />
        );
    }
}

export default PaginationComponent;