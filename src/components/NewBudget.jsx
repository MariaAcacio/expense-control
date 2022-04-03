import { useState }from 'react'
import Message from './Message'

const NewBudget = ({
	budget,
	setBudget, 
	setIsValidBudget
}) => {
	const [message, setMessage] = useState('')
	const handleBudget = (elem) =>{
		elem.preventDefault();

		if(!budget || budget < 0) {
			setMessage('it is not a valid budget');
			setIsValidBudget(false);
			return
		};
		setMessage('')
		setIsValidBudget(true)
	}
  return (
	 <div className='budget-container container shadow'>
		<form onSubmit= {handleBudget} className='form'>
			<div className='field'>
				<label>Define Budget</label>
				<input
					className='new-budget'
					type='number'
					placeholder='Add your Budget'
					value={budget}
					onChange = {e => setBudget(Number(e.target.value))}
				/>
			</div>
			<input 
				type='submit'
				value='add'
			/>
			{message && <Message type = 'error'>{message}</Message> }

		</form>
	 </div>
  )
}

export default NewBudget
