import { useState, useEffect } from "react";
import { setBudgetStyle } from "../helpers";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function BudgetControl(props) {

  const { 
    newBudget,
    expenseList,
    setIsValidBudget,
    setExpenseList, 
    setNewBudget 
  } = props;

  const [availableBudget, setAvailableBudget] = useState(0);
  const [availableBudgetPercentage, setAvailableBudgetPercentage] = useState(0);
  const [spentBudget, setSpentBudget] = useState(0);

  useEffect(() => {
    const totalSpent = expenseList.reduce((totalSpent, expense) => expense.amount + totalSpent, 0);
    const totalAvailable = newBudget - totalSpent;
    const newPercentage = (totalAvailable * 100 / newBudget).toFixed(2);

    setTimeout(() => {
      setAvailableBudgetPercentage(newPercentage);
    }, 500);
    setSpentBudget(totalSpent);
    setAvailableBudget(totalAvailable);
  }, [expenseList]);

  const handleResetApp = () => {
    const answer = confirm('¿De verdad quieres resetar tu información?')
    if(answer){
      setNewBudget(0);
      setExpenseList([]);
      setIsValidBudget(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            trailColor: availableBudget < 0 ? '#F73E3E' : '',
            pathColor: availableBudget < 0 ? '#F73E3E' : '#3E62F7',
            textColor: availableBudget < 0 ? '#F73E3E' : '#3E62F7',
          })}
          value={availableBudgetPercentage}
          text={`${availableBudgetPercentage}% ${availableBudgetPercentage > 0 ?'Libre':'Gastado'}`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={() => handleResetApp()}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {setBudgetStyle(newBudget)}
        </p>
        <p className={availableBudget < 0 ? 'negativo' : ''}>
          <span>Saldo actual: </span> {setBudgetStyle(availableBudget)}
        </p>
        <p>
          <span>Saldo gastado: </span> {setBudgetStyle(spentBudget)}
        </p>
      </div>
    </div>
  );
}

export default BudgetControl;
