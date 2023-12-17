export const createHeaders = (apiKey: string) => {
    return {
        Authorization: `Bearer ${apiKey}`,
        'OpenAI-Organization': 'sua-organizacao-aqui',
    };
};