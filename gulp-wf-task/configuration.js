const allFile = '*.*';

module.exports = {
    src: `src/`,
    dist: `dist/`,
    theme: 'theme',
    plugin: 'plugin',
    index: 'index',
    allFile: allFile,
    allFolderFile: `**/${allFile}`,
    assets: 'assets/',
    prefix: 'wf-',
    ip: '127.0.0.1',
    port: '3015',
}