class MenuToggle {
    constructor() {
        this.classButton = 'toggle-menu';
        this.isWatch = false;
    }

    build() {
        this.update();
        this.buildClick();

        if (!this.isWatch) {
            this.isWatch = true;
            this.watchResize();
        }
    }

    update() {
        this.elButton = document.querySelectorAll(`.${this.classButton}`);
    }

    buildClick() {
        Array.prototype.forEach.call(this.elButton, (el) => {
            el.onclick = () => {
                const attribute = 'style';
                const sibling = el.nextElementSibling;
                const isStyle = sibling.hasAttribute(attribute);

                if (isStyle) {
                    sibling.removeAttribute(attribute);
                } else {
                    sibling.style.display = 'flex';
                }
            };
        });
    }

    watchResize() {
        window.onresize = () => {
            this.build();
        };
    }

    reset() {
        this.build();
    }
}

export {
    MenuToggle
};