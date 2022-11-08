export interface IInput{
    data: string,
    isDirty: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    isValid ?: boolean,
    errorMessage ?: string
}

export interface IValidation {
    isValid: boolean,
    errorMessage: string 
}

export interface ITask {
    label: string,
    checked: boolean,
}

export interface ICardComponent{
    direction: string,
    active: boolean,
    clickWithTool: (e: React.MouseEvent<HTMLDivElement>) => void, 
    modal: boolean,
    id: number,
    modalEdit:boolean
}

export interface ITools {
    edit: boolean,
    delete: boolean,
}
