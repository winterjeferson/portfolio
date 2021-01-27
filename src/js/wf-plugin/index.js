window.loadingMain = new LoadingMain();

window.addEventListener('load',
    window.loadingMain.hide(),
     {
        once: true
    });