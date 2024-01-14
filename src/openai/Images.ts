import { AxiosInstance } from 'axios';
import { eModel } from '../enums/eModel';
import { eQuality } from '../enums/eQuality';
import { eResponseFormat } from '../enums/eResponseFormat';
import { eSize, eSizeImageEdit } from '../enums/eSize';
import { eStyle } from '../enums/eStyle';
import IImages, { ImagesModule } from '../interfaces/IImages';

class Images implements IImages {
    private baseURL: AxiosInstance;

    constructor(baseURL: AxiosInstance) {
        this.baseURL = baseURL;
    }

    async createImage(
        prompt: string,
        model: eModel = eModel.DallE2,
        n: number = 1,
        quality: eQuality = eQuality.standard,
        responseFormat: eResponseFormat = eResponseFormat.url,
        size: eSize = eSize._1024x1024,
        style: eStyle = eStyle.vivid,
        user: string = "",
    ): Promise<ImagesModule.ImageResponse[]> {

        try {
            if (model === eModel.DallE2) {
                if (prompt.length > 1000) {
                    throw new Error("The maximum length is 1000 characters for dall-e-2");
                }
                if (n <= 0 || n > 10) {
                    throw new Error("The number of images to generate must be between 1 and 10 for dall-e-2");
                }
                if (quality) {
                    console.warn("The param 'quality' is only supported for dall-e-3 and will be ignored");
                }

                if (size === eSize._1792x1024 || size === eSize._1024x1792) {
                    throw new Error(`Size not supported for dall-e-2 (${eSize})`);
                }

                if (style) {
                    console.warn("The param 'style' is only supported for dall-e-3 and will be ignored");
                }

            } else if (model === eModel.DallE3) {
                if (prompt.length > 4000) {
                    throw new Error("The maximum length is 4000 characters for dall-e-3");
                }
                if (n > 1) {
                    throw new Error("The number of images to generate must be 1 for dall-e-3");
                }
            }

            if (!user) {
                console.warn("It's recommended to use the param 'user', this can help OpenAI to monitor and detect abuse.");
            }

            const { data } = await this.baseURL.post<ImagesModule.ImageResponse[]>("images/generations", {
                prompt,
                model,
                n,
                quality,
                "response_format": responseFormat,
                size,
                style,
                user
            });

            return data;
        } catch (error) {
            throw error;
        }
    }

    async createImageEdit(
        image: File,
        prompt: string,
        model: eModel = eModel.DallE2,
        n: number = 1,
        size: eSizeImageEdit = eSizeImageEdit._1024x1024,
        responseFormat: eResponseFormat = eResponseFormat.url,
        mask?: File,
        user?: string,
    ): Promise<ImagesModule.ImageResponse> {
        try {

            if (prompt) {
                if (prompt.length > 1000) {
                    throw new Error("The prompt's maximum length is 1000 characters.");
                }
            }

            if (model === eModel.DallE3) {
                console.warn("The model to use for image generation. Only dall-e-2 is supported at this time.");
                model = eModel.DallE2;
            }

            if (n <= 0 || n > 10) {
                throw new Error("The number of images to generate must be between 1 and 10");
            }

            if (!user) {
                console.warn("It's recommended to use the param 'user', this can help OpenAI to monitor and detect abuse.");
            }

            const { data } = await this.baseURL.post<ImagesModule.ImageResponse>("images/edits", {
                image,
                prompt,
                mask,
                model,
                n,
                size,
                "response_format": responseFormat,
                user
            });

            return data;
        } catch (error) {
            throw error;
        }
    }

    async createImageVariation(
        image: File,
        model: eModel = eModel.DallE2,
        n: number = 1,
        responseFormat: eResponseFormat = eResponseFormat.url,
        size: eSizeImageEdit = eSizeImageEdit._1024x1024,
        user?: string,
    ): Promise<ImagesModule.ImageResponse> {
        if (model === eModel.DallE3) {
            console.warn("The model to use for image generation. Only dall-e-2 is supported at this time.");
            model = eModel.DallE2;
        }

        if (n <= 0 || n > 10) {
            throw new Error("The number of images to generate must be between 1 and 10");
        }

        if (!user) {
            console.warn("It's recommended to use the param 'user', this can help OpenAI to monitor and detect abuse.");
        }

        const { data } = await this.baseURL.post<ImagesModule.ImageResponse>("images/variations", {
            image,
            model,
            n,
            "response_format": responseFormat,
            size,
            user
        });

        return data;
    }
}

export default Images;
