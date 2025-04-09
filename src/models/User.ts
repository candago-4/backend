export default class User{
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;

    constructor(id:number, name:string, email:string, password:string, role:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    setName (new_name:string){
        this.name = new_name;
    }

    setMail (new_email:string){
        this.email = new_email;
    }

    setPassword (new_password:string){
        this.password = new_password;
    }
    setRole (new_role:string){
        this.role = new_role;
    }
    
    getUser(){
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }

}