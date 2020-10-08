export class RegisterDto {
    email : string;
    username : string;
    password : string;
    password2: string;
    userinfo : {
        name : string;
        department : string;
        role : string;
        ativo : boolean;
    }
}
