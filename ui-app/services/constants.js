class Constants {
    momentDateFormat = 'MM-DD-YYYY';
    apiServerConfig = {
        development: {
            redirectLoginUrl: '',
            apiUrl: '',
            logoutUrl: ''
        },
        production: {
            redirectLoginUrl: '',
            apiUrl: '',
            logoutUrl: ''
        }
    };
    getEnvironmentBasedUrl(urlKey) {
        return this.apiServerConfig[appEnvironment][urlKey];
    }
}

export default new Constants();
