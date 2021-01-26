class Tag {
    constructor() {
        this.elTag = document.querySelectorAll('.tag');
    }

    build() {
        if (this.elTag.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        Array.prototype.forEach.call(this.elTag, function (item) {
            let button = item.querySelector('.button__close');

            if (button === null) {
                return;
            }

            button.addEventListener('click', () => {
                button.parentNode.parentNode.removeChild(button.parentNode);
            });
        });
    }
}

export {
    Tag
};