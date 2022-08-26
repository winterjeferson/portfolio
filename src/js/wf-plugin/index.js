window.theme = new Theme();
window.loadingMain = new LoadingMain();

window.addEventListener('load',
    window.loadingMain.hide(),
    window.theme.init(), {
        once: true
    });