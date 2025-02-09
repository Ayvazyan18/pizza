import React, { useCallback, useRef, useState } from 'react'
import SearchLogo from '../../assets/img/search.png'
import CloseLogo from '../../assets/img/close.png'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/filter/slice'


const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setValue('')
		if(inputRef.current) {
			inputRef.current.focus()
		}
	}

	const updateSearchValue = useCallback(
		debounce((str:string) => {
			dispatch(setSearchValue(str))
		}, 250),
		[]
	)

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.search_content}>
			<input
				ref={inputRef}
				value={value}
				placeholder='Поиск пиццы ...'
				onChange={onChangeInput}
				className={styles.search_inp}
			/>
			<img src={SearchLogo} alt='Search-img' className={styles.search_img} />
			{value && (
				<img
					onClick={onClickClear}
					src={CloseLogo}
					alt='Close-img'
					className={styles.close_img}
				/>
			)}
		</div>
	)
}

export default Search