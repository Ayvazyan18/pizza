import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../scss/app.scss'

const typeNames = ['тонкое', 'традиционное']


const FullPizza: React.FC = () => {
	const { id } = useParams()
	const pizzaId = Number(id) || 0
	const navigate = useNavigate()


	const [pizza, setPizza] = useState<{
		imageUrl: string
		title: string
		price: number
		sizes: number[]
		types: number[]
	} | null>(null)

	const [activeType, setActiveType] = useState(0)
	const [activeSize, setActiveSize] = useState(0)

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://678551721ec630ca33a824fb.mockapi.io/items/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении данных!' + error)
				navigate('/')
			}
		}

		fetchPizza()
	}, [pizzaId])

	if (!pizza) {
		return <>'Идет загрузка...'</>
	}

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<img className='pizza-block__image' src={pizza.imageUrl} alt='Pizza' />
				<h4 className='pizza-block__title'>{pizza.title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{pizza.types.map(typeId => (
							<li
								key={typeId}
								onClick={() => setActiveType(typeId)}
								className={activeType === typeId ? 'active' : ''}
							>
								{typeNames[typeId]}
							</li>
						))}
					</ul>
					<ul>
						{pizza?.sizes?.map((size: number, i: number) => {
							return (
								<li
									key={i}
									onClick={() => setActiveSize(i)}
									className={activeSize === i ? 'active' : ''}
								>
									{size} см.
								</li>
							)
						})}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {pizza.price} ₽</div>
					<button
						className='button button--outline button--add'
					>
						<span>Назад</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default FullPizza
