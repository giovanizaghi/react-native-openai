import { eQuality } from "../enums/eQuality";
import { eModel } from "../enums/eModel";
import { eResponseFormat } from "../enums/eResponseFormat";
import { eSize } from "../enums/eSize";
import { eStyle } from "../enums/eStyle";
import { OpenAI } from "../openai/OpenAI";


describe('OpenAI', () => {
    let openAI: OpenAI;
    const mockApiKey = 'mock-api-key';
    const mockOrganization = 'mock-org';

    beforeEach(() => {
        openAI = new OpenAI(mockApiKey, mockOrganization);
      });
    

    it('should create Image with mocked HTTP call (createImage)', async () => {
        const mockedAxios = jest.spyOn(openAI.images['baseURL'], 'post');

        const response = await openAI.images.createImage('Foto de um gato spynx', eModel.DallE2, 1, eQuality.standard, eResponseFormat.url, eSize._1024x1024, eStyle.vivid, 'mock-user');
        console.log("teste", response);
        expect(mockedAxios).toHaveBeenCalledTimes(1);
        expect(response).toBeDefined();
    }, 120000);

});
