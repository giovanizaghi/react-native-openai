import { eModel } from "../enums/eModel";
import { eQuality } from "../enums/eQuality";
import { eResponseFormat } from "../enums/eResponseFormat";
import { eSize, eSizeImageEdit } from "../enums/eSize";
import { eStyle } from "../enums/eStyle";
/**
 * Interface for interacting with OpenAI API to generate and manipulate images.
 */
export default interface IImages {

    /**
      * Creates an image given a prompt.
      *
      * @param prompt A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2 and 4000 characters for dall-e-3.
      * @param model The model to use for image generation. Defaults to dall-e-2.
      * @param n The number of images to generate. Must be between 1 and 10. For dall-e-3, only n=1 is supported.
      * @param quality The quality of the image that will be generated. Defaults to standard. hd creates images with finer details and greater consistency across the image. This param is only supported for dall-e-3.
      * @param responseFormat The format in which the generated images are returned. Must be one of url or b64_json.
      * @param size The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 for dall-e-2. Must be one of 1024x1024, 1792x1024, or 1024x1792 for dall-e-3 models.
      * @param style The style of the generated images. Must be one of vivid or natural. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. This param is only supported for dall-e-3.
      * @param user A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
      * @returns A promise that resolves to an object containing information about the generated images.
      */
    createImage: (
        prompt: string,
        model?: eModel,
        n?: number,
        quality?: eQuality,
        responseFormat?: eResponseFormat,
        size?: eSize,
        style?: eStyle,
        user?: string,
    ) => Promise<ImagesModule.ImageResponse>;

    /**
    * Creates an edited or extended image given an original image and a prompt.
    *
    * @param image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
    * @param prompt A text description of the desired image(s). The maximum length is 1000 characters.
    * @param model The model to use for image generation. Defaults to dall-e-2. Only dall-e-2 is supported at this time.
    * @param n The number of images to generate. Must be between 1 and 10.
    * @param size The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024.
    * @param responseFormat The format in which the generated images are returned. Must be one of url or b64_json.
    * @param mask An additional image whose fully transparent areas indicate where the image should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as the image.
    * @param user A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
    * @returns A promise that resolves to an object containing information about the generated images.
    */
    createImageEdit: (
        image: File,
        prompt: string,
        model: eModel,
        n: number,
        size: eSizeImageEdit,
        responseFormat: eResponseFormat,
        mask?: File,
        user?: string
    ) => Promise<ImagesModule.ImageResponse>;

    /**
        * Creates a variation of a given image.
        *
        * @param image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
        * @param model The model to use for image generation. Defaults to dall-e-2. Only dall-e-2 is supported at this time.
        * @param n The number of images to generate. Must be between 1 and 10. For dall-e-3, only n=1 is supported.
        * @param responseFormat The format in which the generated images are returned. Must be one of url or b64_json.
        * @param size The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024.
        * @param user A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
        * @returns A promise that resolves to an object containing information about the generated images.
        */
    createImageVariation: (
        image: File,
        model: eModel,
        n: number,
        responseFormat: eResponseFormat,
        size: eSizeImageEdit,
        user?: string
    ) => Promise<ImagesModule.ImageResponse>;

}

/**
 * Module containing interfaces for image-related responses.
 */
export module ImagesModule {
    /**
     * Interface for the response object containing information about generated images.
     */
    export interface ImageResponse {
        created: number,
        data: ImageData[]
    }
    /**
         * Interface for the data object within the image response.
         */
    export interface ImageData {
        url: string,
    }
}