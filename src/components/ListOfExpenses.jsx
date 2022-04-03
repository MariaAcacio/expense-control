import Expense from "./Expense"
const ListOfExpenses = ({ 
	expenses, 
	setEditExpense, 
	eliminateExpense,
	filter,
	filteredExpenses 
}) => {
  return (
	 <div className="List-expenses container">
		 {
			 filter ? (
				<>
					<h2>{ filteredExpenses.length ? 'Expenses' : 'There are no expenses yet in this category' }</h2>
					{filteredExpenses.map( expense => (
						<Expense
							key={expense.id}
							expense = {expense}
							setEditExpense = {setEditExpense}
							eliminateExpense = {eliminateExpense}
						/>
					))}
				</>
			) : (
					<>
						<h2>{ filteredExpenses.length ? 'Expenses' : 'No expenses yet' }</h2>
						{expenses.map( expense => (
							<Expense
							key={expense.id}
							expense = {expense}
							setEditExpense = {setEditExpense}
							eliminateExpense = {eliminateExpense}
							/>
						))}
					</>
			)
		 } 
	 </div>
  )
}

export default ListOfExpenses
