import {Dispatch, SetStateAction} from "react";

export interface IFormState {
  secteur: string,
  ligne: number,
  caracteristique_id:number,
  valeur: number,
  conforme: boolean,
  data: Date
}

export interface Caracteristique {
  id: number,
  code: string,
  libele: string,
  secteur: string,
  unite : string,
  Min: number,
  Max: number,
  frequence:string,
  gravite: string,
  tps_controle:number
}

export interface ControleDto {
  conforme: boolean,
  caracteristiqueId:number,
  valeur: number,
  logDate: string,
}

export interface StepFromProps {
  nextForm: () => void,
  form?: IFormState,
  setForm: Dispatch<SetStateAction<IFormState>>
}