import ReactPaginate from 'react-paginate'
import style from './Pagination.module.scss'
import React from 'react'

type PaginationProps = {
	currentPage: number
	onChangePage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onChangePage,
}) => (
	<ReactPaginate
		className={style.pagination_content}
		breakLabel='...'
		nextLabel='>'
		onPageChange={e => onChangePage(e.selected + 1)}
		pageRangeDisplayed={4}
		previousLabel='<'
		pageCount={3}
		forcePage={currentPage - 1}
		renderOnZeroPageCount={null}
	/>
)

export default Pagination
