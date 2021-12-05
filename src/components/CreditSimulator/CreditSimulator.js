import { useMemo, useState } from "react";
import { formatCurrency } from "../../utils/utilFunctions";
import SliderContainer from "../Shared/Slider/SliderContainer";
import styles from "./CreditSimulator.module.css";

const creditSimulatorConfig = {
  totalAmount: {
    min: 5000,
    max: 50000,
    valueFormatter: formatCurrency({ thousands: "." }),
    title: "monto total",
  },
  timespan: {
    min: 3,
    max: 24,
    title: "plazo",
  },
};
const CreditSimulator = () => {
  const [monthlyFee, setMonthlyFee] = useState(
    creditSimulatorConfig.totalAmount.min
  );
  const [timespan, setTimespan] = useState(creditSimulatorConfig.timespan.min);

  const fixedMonthlyFee = useMemo(
    () => monthlyFee / timespan,
    [monthlyFee, timespan]
  );
  const handleMonthlyFeeChange = (valueOrEvent) => {
    if (valueOrEvent?.target) setMonthlyFee(valueOrEvent.target.value);
    else setMonthlyFee(valueOrEvent);
  };
  const handleTimespanChange = (valueOrEvent) => {
    if (valueOrEvent?.target) setTimespan(valueOrEvent.target.value);
    else setTimespan(valueOrEvent);
  };

  return (
    <div className={styles["credit-simulation-card"]}>
      <div className={styles["inner"]}>
        <h1>Simulá tu crédito</h1>
        <SliderContainer
          {...creditSimulatorConfig.totalAmount}
          value={monthlyFee}
          onChange={handleMonthlyFeeChange}
        />
        <SliderContainer
          {...creditSimulatorConfig.timespan}
          value={timespan}
          onChange={handleTimespanChange}
        />
        <div className={styles["credit-controls-container"]}>
          <div className={styles["monthly-fee-container"]}>
            <h3>Cuota fija por mes</h3>
            <div className={styles["fixed-monthly-fee"]}>
              {formatCurrency({
                thousands: ",",
                decimals: ".",
                amountOfDecimals: 2,
              })(fixedMonthlyFee)}
            </div>
          </div>
          <div className={styles["btns-container"]}>
            <button className={styles["obtain-credit-btn"]}>
              Obtené crédito
            </button>
            <button className={styles["fee-details-btn"]}>
              {" "}
              Ver detalle de cuotas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditSimulator;
