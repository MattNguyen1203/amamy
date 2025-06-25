export interface ICreateOder {
  thumbnail: string
  title: string
  type: string
  id: number
  information?: IInformationOrder
  slug?: string
  european?: string
}
export interface IInformationTimeOrder {
  time_content?: string
  stock?: string
  clause?: string
  user_chooses?: boolean
  stock_user?: IInformationTimeOrder_StockUser[]
  note_more?: string
}
export interface IInformationTimeOrder_StockUser {
  label: string
  desc: string
  tag: string
}
export interface IInformationNoteOrder {
  title: string
  text: string
  agree_with: string
}
export interface IInformationInstructOrder_SelectBranch {
  title: string
  address: string
  time: string
  phone: string
}
export interface IInformationInstructOrder {
  packing_instructions?: string
  images?: string
  select_branch?: IInformationInstructOrder_SelectBranch[]
  note_more?: string
  shipping_instructions_image?: string[]
}
export interface IInformationInsurance_policy {
  content: string
  clause: string
}
export interface IInformationInsurance_CargoInsuranceJapanvn {
  title: string
  content: string
  image?: string
  clause: string
}
export interface IInformationInsurance {
  compensation: {
    title: string
    desc: string
    policy: IInformationInsurance_policy[]
  }
  cargo_insurance_japanvn: IInformationInsurance_CargoInsuranceJapanvn[]
  user_chooses?: boolean
  insurance_types?: {
    clause: string
    list_insurance_types: IInformationInsurance_Types[]
  }
}
export interface IInformationInsurance_Types {
  label: string
  desc: string
  tag?: string
}
export interface IInformation_Package {
  label: string
  desc: string
  tag?: string
  separate_request?: boolean
}
export interface IInformationOrder {
  time?: IInformationTimeOrder[]
  note?: IInformationNoteOrder[]
  instruct?: IInformationInstructOrder
  insurance?: IInformationInsurance
  shipping_cost?: string
  important_note?: string
  payment_method?: {
    value: string
    title: string
  }[]
  package?: {
    title: string
    list_package: IInformation_Package[]
    note_more?: string
  }
}
