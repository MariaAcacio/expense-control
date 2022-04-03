import { useState, useEffect } from 'react'
import  Message from './Message'
import CloseModal from '../img/cerrar.svg'

const Modal = ({
	setModal, 
	animateModal, 
	setAnimateModal, 
	saveExpenses, 
	editExpense,
	setEditExpense
}) => {
	const [ message, setMessage ] = useState('') 
	const [ name, setName ] = useState('')
	const [ amount, setAmount ] = useState('')
	const [ category, setCategory ] = useState('')
	const [date, setDate] = useState('');
	const [id, setId] = useState('');

	useEffect(() => {
		if (Object.keys(editExpense).length > 0) {
			setName(editExpense.name)
			setAmount(editExpense.amount)
			setCategory(editExpense.category)
			setId(editExpense.id)
			setDate(editExpense.date)
		}
	}, []);
	const hideModal = () => {
		setAnimateModal(false)
		setEditExpense({})
		setTimeout(() => {
			setModal(false)
		},500)
	}
	const handleSubmit = e => {
		e.preventDefault();
		if ([ name, amount, category ].includes('')) {
			setMessage('All fields are required')

			setTimeout(() =>{
				setMessage('')
			},3000);
			return;
		}
		saveExpenses({ name, amount, category, id, date })

	}
  return (
	 <div className="modal">
		<div className="close-modal">
			<img
				src={CloseModal}
				alt='close modal'
				onClick={hideModal} 
			/>
		</div>

		<form 
			onSubmit={handleSubmit}
			className={`form ${animateModal ? 'animate' : 'close'}`}
		>
			<legend>{editExpense.name ? 'Edit Expense' : 'New Expense'}</legend>
			{ message && <Message type='error'>{message}</Message> }
			<div className='field'>
				<label htmlFor='name'>Name Expense</label>

				<input
					id='name'
					type='text'
					placeholder='Add the name of the expense'
					value={name}
					onChange = { elem => setName(elem.target.value) }
				/>
			</div>
			<div className='field'>
				<label htmlFor='amount'>Amount</label>

				<input
					id='amount'
					type='number'
					placeholder='Add the amount of the expense: ex. 300'
					value={amount}
					onChange = { elem => setAmount(Number(elem.target.value)) }
				/>
			</div>
			<div className='field'>
				<label htmlFor='category'>Category</label>
				<select
					id='category'
					value={category}
					onChange = { elem => setCategory(elem.target.value) }
				>
					<option value=''>-- Select -- </option>
					<option value='saving'>Saving</option>
					<option value='food'>Food</option>
					<option value='house'>House</option>
					<option value='expenses'>Miscellaneous Expenses</option>
					<option value='entertainment'>Entertainment</option>
					<option value='health'>Health</option>
					<option value='subscriptions'>Subscriptions</option>

				</select>
			</div>

			<input
				type="submit"
				value={editExpense.name ? 'Save Changes' : 'Add Expense'}
			/>
		</form>
	 </div>
  )
}

export default Modal
