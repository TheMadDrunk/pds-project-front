import {Button} from "./Button/Button.tsx";
import Select from "react-select";
import {useEffect, useState} from "react";
import {ENV} from "../assets/env.ts";
import {StepFromProps} from "../types.ts";



export function LigneForm({nextForm,form, setForm}: StepFromProps) {

  const [options, setOptions] = useState();

  const getLignes = async () => {

    const res = await fetch(ENV.API_URL + "/lignes");
    const lignes = await res.json();

    const options_ = lignes.map(ligne => {
      return {value: ligne.id, label: ligne.nom}
    })

    setOptions(options_)

  }

  useEffect(() => {
    getLignes()
  }, []);

  const handleOnNextClick = ()=>{
      nextForm();
  }

  const handleOnSelectChange = (op : {value:number})=>{
    setForm((prevState)=>({...prevState,ligne:op.value}))
  }

  return (<>
    <Select onChange={handleOnSelectChange} options={options}  />
    <Button onClick={handleOnNextClick} disabled={form?.ligne == null} >NEXT</Button>
    </>);
}