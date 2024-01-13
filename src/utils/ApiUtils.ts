export const createHeaders = (apiKey: string, organization: string) => {
    return {
        Authorization: `Bearer ${apiKey}`,
        'OpenAI-Organization': organization,
    };
};