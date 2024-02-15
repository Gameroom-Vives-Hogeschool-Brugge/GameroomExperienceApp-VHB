import axios from 'axios';
interface LoginResponse {
    responseCode: number;
    data: string | undefined;
}

export default class LoginService {
    loggedIn: boolean;
    apiLink: string;

    constructor() {
        this.loggedIn = false;
        this.apiLink = "http://localhost:3000/login";
    }
    
    async login(link: string): Promise<LoginResponse> {
        const response = await axios.post(this.apiLink, 
            {
                link: link
            }, 
            {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return {
            responseCode: response.status,
            data: response.data
        }
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
