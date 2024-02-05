import axios from 'axios';

export default class LoginService {
    loggedIn: boolean;

    constructor() {
        this.loggedIn = false;
    }
    
    async login(link: string): Promise<void> {
        console.log('Logging in...', link);
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
