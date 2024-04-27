import styles from "./Label.module.css"

export function Label({ name, value}:{name : string,value: string | number}){
  return (<div className={styles.wrapper+" bg-light"}>
    <label className={styles.label}>{name}:</label>
    <span className={styles.span}>{value}</span>
  </div>)
}