import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ListOfExpenses from './components/ListOfExpenses'
import Modal from './components/Modal'
import { generateId } from './helpers'
import NewExpenseIcon from './img/nuevo-gasto.svg'

function App() {
	const [ expenses, setExpenses ] = useState(
		// It is converted from a string to an array with JSON.parse 
		localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
	);
	const [ budget, setBudget ] = useState(
		Number(localStorage.getItem('budget')) ?? 0
	);
	const [ isValidBudget, setIsValidBudget ] = useState(false);
	const [ modal, setModal ] = useState(false);
	const [ animateModal, setAnimateModal ] = useState(0);
	const [ editExpense, setEditExpense ] = useState({});
	const [ filter, setFilter ] = useState('');
	const [ filteredExpenses, setFilteredExpenses ] = useState([]);

	useEffect(() => {
		if (Object.keys(editExpense).length > 0) {
			setModal(true)
			
			setTimeout(() => {
				setAnimateModal(true)
			}, 500)
		}
	}, [ editExpense ]);

	useEffect(() => {
		localStorage.setItem('budget', budget ?? 0)
	}, [budget]);

	useEffect(() => {
		 localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
	}, [expenses]);

	useEffect(() => {
		if (filter) {
			// Filter expenses by category
			const filteredExpenses = expenses.filter(expense => expense.category === filter);
			setFilteredExpenses(filteredExpenses);
			
		}
	}, [filter]);

	useEffect(() => {
		const budgetLocalStorage = Number(localStorage.getItem('budget')) ?? 0;

		if (budgetLocalStorage > 0) {
			setIsValidBudget(true)
		}
	}, []);

	const handleNewExpense = () => {
		setModal(true);
		setEditExpense({})

		setTimeout(() => {
			setAnimateModal(true)
		}, 500)
	}

	const saveExpenses = expense => {
		if (expense.id) {
			// Update
			const UpdatedExpenses = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState)	
			setExpenses(UpdatedExpenses);
			setEditExpense({})
		}
		else{
			// New Expense
			expense.id = generateId();
			expense.date = Date.now();
			setExpenses([...expenses, expense ])
		}

		setAnimateModal(false)
		setTimeout(() => {
			setModal(false)
		},500)
	}

	const eliminateExpense = id => {
		const updatedExpenses = expenses.filter( expense => expense.id !== id);
		setExpenses(updatedExpenses);
	}
  return (
	  <div className={modal ? 'fix-it' : ''}>
		<Header
			expenses = {expenses}
			setExpenses = {setExpenses}
			budget = {budget}
			setBudget = {setBudget}
			isValidBudget = {isValidBudget}
			setIsValidBudget = {setIsValidBudget}
		/>
		{ isValidBudget && (
			<>
				<main>
					<Filters
						filter = {filter}
						setFilter = {setFilter}
					/>
					<ListOfExpenses
						expenses = {expenses}
						setEditExpense = {setEditExpense}
						eliminateExpense = {eliminateExpense}
						filter = {filter}
						filteredExpenses = {filteredExpenses}
					/>
				</main>
				<div className='new-expense'>
					<img
						src={NewExpenseIcon}
						alt='New Expense Icon'
						onClick={handleNewExpense}
					/>
				</div>
			</>
		)}
		{ modal && <Modal
			setModal = {setModal}
			animateModal = {animateModal}
			setAnimateModal = {setAnimateModal}
			saveExpenses = {saveExpenses}
			editExpense = {editExpense}
			setEditExpense = {setEditExpense}
		/> }
	  </div>
  )
}

export default App
