import { EmergencyContactsType } from "../context/contactContext"

export type NumberProps = {
  number: string
}

export type ContactItemProps = {
    name: string,
    phoneNumbers: string,
    emergency: boolean,
    setEmerContacts?: React.Dispatch<React.SetStateAction<EmergencyContactsType>>,
    emerContacts?: EmergencyContactsType
}
