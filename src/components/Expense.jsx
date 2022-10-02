import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { setBudgetStyle } from "../helpers";

import SavingIcon from "../img/icono_ahorro.svg";
import HouseIcon from "../img/icono_casa.svg";
import FoodIcon from "../img/icono_comida.svg";
import ExpenseIcon from "../img/icono_gastos.svg";
import LeisureIcon from "../img/icono_ocio.svg";
import HealthIcon from "../img/icono_salud.svg";
import SubscriptionsIcon from "../img/icono_suscripciones.svg";

function Expense({ expense, setExpenseToEdit, deleteExpense }) {
  const { name, date, amount, category, id } = expense;
  const iconsDictionaire = {
    ahorro: SavingIcon,
    comida: FoodIcon,
    casa: HouseIcon,
    gastos: ExpenseIcon,
    ocio: LeisureIcon,
    salud: HealthIcon,
    suscripciones: SubscriptionsIcon,
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseToEdit(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => deleteExpense(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconsDictionaire[category]} alt="Icono de gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{date}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{setBudgetStyle(amount)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default Expense;
