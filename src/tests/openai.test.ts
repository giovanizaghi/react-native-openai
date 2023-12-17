import { eQuality } from "../enums/eQuality";
import { eModel } from "../enums/eModel";
import OpenAI from "../openai/OpenAI";
import { eResponseFormat } from "../enums/eResponseFormat";
import { eSize } from "../enums/eSize";
import { eStyle } from "../enums/eStyle";
import HttpInterceptor from "../httpInterceptor";


jest.mock('../httpInterceptor', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            getInstance: jest.fn(),
        })),
    };
});

// Mocking axios methods
jest.mock('axios', () => ({
    create: jest.fn(),
}));

describe('OpenAI', () => {
    const mockApiKey = 'mock-api-key';
    const mockOrganization = 'mock-organization';

    it('should create OpenAI instance', () => {
        const openAI = new OpenAI(mockApiKey, mockOrganization);
        const mockHttpInterceptor = new HttpInterceptor('mock-api-key', 'mock-organization');

        openAI.setBaseURLForTesting(mockHttpInterceptor);

        expect(openAI['baseURL']).toBeDefined();
    });

    it('should create Image with mocked HTTP call (createImage)', async () => {
        const openAI = new OpenAI(mockApiKey, mockOrganization);
        const mockImageResponse = { created: Date.now(), data: [{ url: 'mock-image-url' }] };

        jest.spyOn(openAI.images, 'createImage').mockResolvedValue(mockImageResponse);

        const response = await openAI.images.createImage('mock-prompt', eModel.DallE2, 1, eQuality.standard, eResponseFormat.url, eSize._1024x1024, eStyle.vivid, 'mock-user');

        expect(response).toEqual(mockImageResponse);
    });
    
});
