import {Caracteristique, StepFromProps} from "../../types.ts";
import {useEffect, useState} from "react";
import {ENV} from "../../assets/env.ts";
import Select from "react-select";
import {Button} from "../Button/Button.tsx";
import styles from "./Controle.module.css"
import {Label} from "../Label/Label.tsx";


export function ControleForm({form,nextForm,setForm}:StepFromProps){

  const [options, setOptions] = useState();
  const [caracs, setCaracs] = useState<Caracteristique[]>([]);
  const [selectedCara, setSelectedCara] = useState<Caracteristique>();
  const [isConfrome, setIsConfrome] = useState(null)

  const getCaras = async () => {

    const res = await fetch(ENV.API_URL + "/secteur/"+form?.secteur+"/caracteristique");
    const caracs = await res.json();

    const options_ = caracs.map(cara => {
      return {value: cara.id, label: cara.code+" - "+cara.libele}
    })

    setOptions(options_)
    setCaracs(caracs)
  }

  useEffect(() => {
    getCaras()
  }, []);

  const handleOnNextClick = ()=>{
    console.log("FROM:",form)
    nextForm();
  }

  const handleOnSelectChange = (op : {value:number})=>{
    setSelectedCara(caracs.find(cara => cara.id === op.value))
    setForm((prevState)=>({...prevState,code:op.value,conforme:null,caracteristique_id:op.value}))
  }

  const isValConfrom = (val:number) => {
    return selectedCara.Min < val && selectedCara.Max > val
  }

  const onValueChange = (e) => {
    const val = e.target.value;
    setForm((prevState)=>({...prevState,valeur:Number(val),conforme:isValConfrom(Number(val)) }))
  }

  const handleConfrome = (conform) => {
    setIsConfrome(conform)
    setForm((prevState)=>({...prevState,conforme:conform,valeur:null}))
  }

  return (<>
    <Select onChange={handleOnSelectChange} options={options} isSearchable  />
    {
      selectedCara &&
        <div className="m-2">
            <Label name={"Frequence"} value={selectedCara.frequence} />
            <Label name={"Gravite"} value={selectedCara.gravite} />
            <Label name={"Tps Controle"} value={selectedCara.tps_controle} />
          {selectedCara.unite &&
              <div className={styles.valueWrapper}>
                  <span
                      className={styles.value + ((selectedCara.Min >= form?.valeur) ? " text-danger" : "")}>{selectedCara.Min + " <"} </span>
                  <input type="number" className={styles.valueInput} onChange={onValueChange}/>

                  <span
                      className={styles.value + ((selectedCara.Max <= form?.valeur) ? " text-danger" : "")}>{"< " + selectedCara.Max}</span>
                  <span>{selectedCara.unite}</span>

              </div>
          }
          {!selectedCara.unite && <div>
              <Button onClick={() => handleConfrome(true)} className={"btn-success"} disabled={isConfrome == true}>Conforme</Button>
              <Button onClick={() => handleConfrome(false)} className={"btn-danger"} disabled={isConfrome == false}>Non Conforme</Button>
          </div>}
        </div>
    }
    <Button onClick={handleOnNextClick} disabled={form?.conforme == null && form?.valeur == null}>Submit</Button>
  </>);

}