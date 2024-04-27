import { useState } from 'react'
import {LigneForm} from "./components/LigneForm.tsx";
import {SecteurForm} from "./components/SecteurForm.tsx";
import {ControleDto, IFormState} from "./types.ts";
import {ControleForm} from "./components/ControleFrom/ControleForm.tsx";
import {ENV} from "./assets/env.ts";

const formSteps = [
  {
    title: "Ligne",
  },
  {
    title: "Secteur",
  },
  {
    title: "Controle",
  }
]

function App() {
  const [step, setStep] = useState(1)
  const [formState, setFormState] = useState<IFormState>()

  function nextForm() {
    setStep((step) => step + 1)
  }

  function submitForm() {
    const controle : ControleDto = {
      caracteristiqueId : formState?.caracteristique_id,
      conforme : formState?.conforme,
      valeur : formState?.valeur,
      logDate : new Date().toISOString().slice(0,-1)
    }

    console.log("CONTROLE:",controle)

    fetch(ENV.API_URL+"/controle",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(controle)
    })

    setStep(1)
    setFormState(null)
  }


  function prevForm() {
    if(step > 1)
      setStep((step) => step - 1)
  }
  return (
    <div className="container w-50">
      <h2 className="text-primary" ><span onClick={prevForm} style={{cursor:"pointer"}} className="m-1 font-weight-bold" >{"<"}</span>{`Step ${step} : ${formSteps[step-1].title}`}</h2>
      {step === 1 && <LigneForm nextForm={nextForm} form={formState} setForm={setFormState}/>}
      {step === 2 && <SecteurForm nextForm={nextForm} setForm={setFormState} form={formState}/>}
      {step === 3 && <ControleForm nextForm={submitForm} setForm={setFormState} form={formState}/>}
    </div>
  )
}

export default App
