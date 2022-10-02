import { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseFilter from './components/ExpenseFilter';
import ExpensesList from './components/ExpensesList';
import ExpenseModal from './components/ExpenseModal';
import {generateId, formatDate} from './helpers/index';
import NewExpenseIcon from './img/nuevo-gasto.svg';

function App() {

  const readExpenseFromLS = () => Number(localStorage.getItem('newBudget')) ?? 0;
  const setExpenseToLS = () => localStorage.setItem('newBudget', newBudget) ?? 0;
  const readExpenseListFromLS = () => localStorage.getItem('expenseList') ? JSON.parse(localStorage.getItem('expenseList')) : [];
  const setExpenseListToLS = () => localStorage.setItem('expenseList', JSON.stringify(expenseList) ?? []);

  const [animarModal, setAnimarModal] = useState(false);
  const [expenseFilter, setExpenseFilter] = useState('');
  const [expenseFilteredList, setExpenseFilteredList] = useState([]);
  const [expenseList, setExpenseList] = useState(readExpenseListFromLS);
  const [expenseToEdit, setExpenseToEdit] = useState({});
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(readExpenseFromLS);
  const [modal, setModal] = useState(false);
  
  const openNewExpenseModal = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  }
  
  useEffect(() => {
    if(expenseFilter){
      const expenseFilteredList = expenseList.filter(expense => 
        expense.category === expenseFilter);
      setExpenseFilteredList(expenseFilteredList);
    }
  },[expenseFilter])

  useEffect(() => {
    setExpenseListToLS();
  },[expenseList])

  useEffect(() => {
    if(Object.keys(expenseToEdit).length > 0){
      openNewExpenseModal();
    }
  }, [expenseToEdit])

  useEffect(() => {
    setExpenseToLS();
  },[newBudget])

  useEffect(() => {
    if (readExpenseFromLS() > 0) setIsValidBudget(true);
  },[])

  const addNewExpense = currentExpense => {
    if(currentExpense.id){
      const updatedExpensesList = expenseList.map(
        expense => expense.id !== currentExpense.id ? expense : currentExpense
      );
      setExpenseList(updatedExpensesList);
      return;
    }
    currentExpense.id = generateId();
    currentExpense.date = formatDate();
    setExpenseList([...expenseList, currentExpense]);
  }

  const deleteExpense = id => {
    const updatedExpensesList = expenseList.filter(expense => expense.id !== id);
    setExpenseList(updatedExpensesList);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        newBudget = {newBudget}
        setNewBudget = {setNewBudget}
        isValidBudget = {isValidBudget}
        setIsValidBudget = {setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <ExpenseFilter
              expenseFilter={expenseFilter}
              setExpenseFilter={setExpenseFilter}
            />
            <ExpensesList
              deleteExpense={deleteExpense}
              expenseFilteredList={expenseFilteredList}
              expenseFilter={expenseFilter}
              expenseList={expenseList}
              setExpenseToEdit={setExpenseToEdit}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={NewExpenseIcon}
              alt='Icono nuevo gasto'
              onClick={openNewExpenseModal}
            />
          </div>
        </>
      )}

      {modal && 
        <ExpenseModal
          deleteExpense={deleteExpense}
          expenseToEdit={expenseToEdit}
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          addNewExpense={addNewExpense}
          setExpenseToEdit={setExpenseToEdit}
        />
      }
    </div>
  )
}

export default App
