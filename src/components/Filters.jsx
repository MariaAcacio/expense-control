import { useState, useEffect } from 'react'

const Filters = ({ filter, setFilter}) => {
  return (
	 <div className='filters shadow container'>
		<form>
			<div className='field'>
				<label>Filter Expenses</label>
				<select 
					value={filter}
					onChange = {e => setFilter(e.target.value)}
				>
					<option value=''>-- All Categories -- </option>
					<option value='saving'>Saving</option>
					<option value='food'>Food</option>
					<option value='house'>House</option>
					<option value='expenses'>Miscellaneous Expenses</option>
					<option value='entertainment'>Entertainment</option>
					<option value='health'>Health</option>
					<option value='subscriptions'>Subscriptions</option>
				</select>
			</div>
		</form>		
	 </div>
  )
}

export default Filters
