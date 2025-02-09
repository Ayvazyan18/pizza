import React, { memo } from 'react'

type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
	let categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => {
					return (
						<li
							onClick={() => onChangeCategory(i)}
							className={value === i ? 'active' : ''}
							key={i}
						>
							{categoryName}
						</li>
					)
				})}
			</ul>
		</div>
	)
})

export default Categories
