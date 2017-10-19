class AssetsProvider {
    constructor(isInExtensionMode) {
        this.isInExtensionMode = isInExtensionMode;
    }

    getAsset(pathToAsset) {
        if (this.isInExtensionMode) {
            return chrome.extension.getURL(pathToAsset);
        }
        else {
            return pathToAsset;
        }
    }
}

export default AssetsProvider;