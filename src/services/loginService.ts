import axios from 'axios';

export default class LoginService {
    loggedIn: boolean;

    constructor() {
        this.loggedIn = false;
    }
    
    async login(link: string): Promise<void> {
        console.log(link)

        const options = {
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                link: link,
            },
        };

        axios.post(options)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
