import React, { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Sort, { sortList } from '../components/Sort'
import Loading from '../assets/img/animation.gif'
import qs from 'qs'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selector'
import { selectPizzaData } from '../redux/pizza/selector'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { fetchPizza } from '../redux/pizza/asyncAction'

const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	import('../utils/math').then(math => console.log(math.add(16, 26)))

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)

	const { items, status } = useSelector(selectPizzaData)

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizza({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		)
	}

	// React.useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify({
	// 			sortProperty: sort.sortProperty,
	// 			categoryId,
	// 			currentPage,
	// 		})
	// 		navigate(`?${queryString}`)
	// 	}
	// 	if (!window.location.search) {
	// 		dispatch(fetchPizza({} as SearchPizzaParams))
	// 	}
	// 	isMounted.current = true
	// }, [categoryId, sort.sortProperty, currentPage])

	// React.useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search, {
	// 			ignoreQueryPrefix: true,
	// 		}) as SearchPizzaParams

	// 		const sort = sortList.find(
	// 			obj => obj.sortProperty === params.sortBy
	// 		)

	// 		dispatch(setFilters({
	// 			searchValue: params.search,
	// 			categoryId: Number(params.category),
	// 			currentPage: Number(params.currentPage),
	// 			sort: sort || sortList[0]
	// 		}))
	// 	}
	// 	isSearch.current = true
	// }, [])

	React.useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = (
		<div className='loading_container'>
			<img src={Loading} alt='Loading' />
		</div>
	)

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status == 'error' ? (
				<div key={1} className='content__error-info'>
					<h2>Произошло Ошибка</h2>
					<p>К сожалению, не удалось получить пиццы.</p>
				</div>
			) : (
				<div className='content__items'>
					{status == 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	)
}

export default Home
