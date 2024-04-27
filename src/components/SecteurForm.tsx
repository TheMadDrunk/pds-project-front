import {StepFromProps} from "../types.ts";
import {useEffect, useState} from "react";
import {ENV} from "../assets/env.ts";
import Select from "react-select";
import {Button} from "./Button/Button.tsx";


export function SecteurForm({nextForm,form,setForm}:StepFromProps){

  const [options, setOptions] = useState();

  const getSecteurs = async () => {

    const res = await fetch(ENV.API_URL + "/lignes/"+form.ligne+"/secteur");
    const secteurs = await res.json();

    const options_ = secteurs.map(sec => {
      return {value: sec.id, label: sec.nom}
    })
    console.log("options:",options_);
    setOptions(options_)

  }
  useEffect(() => {
    getSecteurs()
  }, []);

  const handleOnNextClick = ()=>{
    nextForm();
  }

  const handleOnSelectChange = (op : {value:number,label:string})=>{
    setForm((prevState)=>({...prevState,secteur:op.label}))
  }

  return (<>
    <Select onChange={handleOnSelectChange} options={options} />
    <Button onClick={handleOnNextClick} disabled={form?.secteur == null}>NEXT</Button>
  </>);
}