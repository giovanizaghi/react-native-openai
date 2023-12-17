import Images from "./Images";
import HttpInterceptor from "../httpInterceptor";

class OpenAI {
    private baseURL: HttpInterceptor;
    public images: Images;

    constructor(apiKey: string, organization: string) {
        this.baseURL = new HttpInterceptor(apiKey, organization);
        const instance = this.baseURL.getInstance();
        this.images = new Images(instance);
    }

    setBaseURLForTesting(baseURL: HttpInterceptor) {
        this.baseURL = baseURL;
        this.images = new Images(baseURL.getInstance());
      }

}

export default OpenAI;
