import { useEffect, useState } from "react";
import FormErrorMessage from "./FormErrorMessage";
import CloseModalIcon from "../img/cerrar.svg";

function ExpenseModal( props ) {

  const { 
    expenseToEdit,
    setModal, 
    animarModal, 
    setAnimarModal, 
    addNewExpense, 
    setExpenseToEdit 
  } = props;

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(Object.keys(expenseToEdit).length > 0){
      setName(expenseToEdit.name);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setId(expenseToEdit.id);
      setDate(expenseToEdit.date);
    }
  },[expenseToEdit])
  
  const closeNewExpenseModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
      setExpenseToEdit({});
    }, 300);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if([name, amount, category].includes('')){
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }
    addNewExpense({name, amount, category, id, date});
    closeNewExpenseModal();
  }
  
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CloseModalIcon}
          alt="Icono cerrar modal"
          onClick={closeNewExpenseModal}
        />
      </div>

      <form 
        className={`formulario ${animarModal ? 'animar' : 'cierre'}`}
        onSubmit={handleSubmit}
      >
        <legend>{Object.keys(expenseToEdit).length > 0 ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        {errorMessage && 
          <FormErrorMessage 
            message={errorMessage} 
            type={'error'}
          />
        }

        <div className='campo'>
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            id='nombre'
            type='text'
            placeholder="A??ada el nombre del gasto"
            value={name}
            onChange={e => (setName(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id='cantidad'
            type='number'
            placeholder="A??ada la cantidad del gasto. Ej: 1000"
            value={amount}
            onChange={e => (setAmount(Number(e.target.value)))}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categor??a</label>
          <select 
            id='categoria'
            value={category}
            onChange={e => (setCategory(e.target.value))}
          >
            <option value=''>-- Seleccione una categor??a --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
          <input
            type='submit'
            value={Object.keys(expenseToEdit).length > 0 ? 'Guardar cambios' : 'A??adir gasto'}
          />
        </div>

      </form>
    </div>
  );
}

export default ExpenseModal;
