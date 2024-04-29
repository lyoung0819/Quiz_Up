
export type UserType = {
    email:string, 
    first_name:string,
    last_name: string, 
    password:string,
    user_id:number, 
    token: string 
    tokenExpiration: string
}

export type UserFormDataType = {
    email:string, 
    first_name:string, 
    last_name:string,  
    password:string, 
    confirmPassword:string 
}


export type QuestionType = {
    author:UserType, 
    created_on:string, 
    id:number, 
    question: string 
}
