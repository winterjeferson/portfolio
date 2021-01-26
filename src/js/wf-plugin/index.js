window.carousel = new Carousel();
window.form = new Form();
window.helper = new Helper();
window.layout = new Layout();
window.lazyLoad = new LazyLoad();
window.loadingMain = new LoadingMain();
window.mask = new Mask();
window.menuDropDown = new MenuDropDown();
window.menuTab = new MenuTab();
window.menuToggle = new MenuToggle();
window.modal = new Modal();
window.notification = new Notification();
window.table = new Table();
window.tag = new Tag();
window.translation = new Translation();


window.addEventListener('load',
    window.translation.build(),
    window.mask.build(),
    window.modal.build(),
    window.carousel.build(),
    window.lazyLoad.build(),
    window.menuDropDown.build(),
    window.menuTab.build(),
    window.menuToggle.build(),
    window.notification.build(),
    window.table.build(),
    window.tag.build(),
    window.loadingMain.hide(),
     {
        once: true
    });