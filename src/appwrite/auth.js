import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account; // can we comment this out?

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // return userAccount; // success message, go to login (user need to click on login)
                // when account is created, login that user directly
                // for this call a method
                return this.login({email, password});
            }
            else {
                return;
            }

        }
        catch(error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const loginUser = await this.account.createEmailSession(email, password);
            return loginUser;
        }
        catch(error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const getUserAccount = await this.account.get();
            return getUserAccount;
        }
        catch(error) {
            // if throw error; return null becomes unreachable
            console.log("Appwrite serive :: getCurrentUser", error);
        }

        return null; // just something to return, do nothing instead of showing user the error?
    }

    async logout() {
        try {
            await this.account.deleteSessions(); // logout of all broswer sessions. deleteSession is for single session
        }
        catch(error) {
            console.log("Appwrite service :: logout", error);
        }
    }
}

const authService = new AuthService();
// IKEA vs local
export default authService;