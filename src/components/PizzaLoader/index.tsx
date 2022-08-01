import pizzaSpinner from '../../assets/img/pizza-loader.gif'

import styles from './PizzaLoader.module.scss';

const PizzaLoader = () => {
  return (
    <div className={styles.loader}><img src={pizzaSpinner} alt="Pizza loader" /></div>
  )
}

export default PizzaLoader