class MenuTab {
    constructor() {
        this.cssMenu = 'tab';
        this.cssMenuActive = `${this.cssMenu}--active`;
        this.cssAllButton = `.${this.cssMenu} > .button, .${this.cssMenu} > .drop-down > .button`;
    }

    build() {
        this.el = document.querySelectorAll(`.${this.cssMenu}`);

        if (this.el.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        const self = this;
        const el = document.querySelectorAll(this.cssAllButton);

        Array.prototype.forEach.call(el, (item) => {
            item.addEventListener('click', () => {
                self.buildCss(item);
            });
        });
    }

    buildCss(item) {
        const elTab = item.parentNode.classList.contains(this.cssMenu) ? item.parentNode : item.parentNode.parentNode;
        const elButton = elTab.querySelectorAll(this.cssAllButton);

        Array.prototype.forEach.call(elButton, (item) => {
            item.classList.remove(this.cssMenuActive);
        });

        item.classList.add(this.cssMenuActive);
    }
}

export {
    MenuTab
};