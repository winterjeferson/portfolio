class Modal {
    constructor() {
        this.isModalOpen = false;

        this.cssHide = 'hide';
        this.cssClose = 'modal--close';

        this.elBody = document.querySelector('body');
    }

    update() {
        this.targetBuildGalleryChange = '';

        this.elModal = document.querySelector('.modal');
        this.elModalFooter = this.elModal.querySelector('footer');
        this.elModalFooterConfirm = this.elModalFooter.querySelector('[data-id="confirm"]');
        this.elModalFooterCancel = this.elModalFooter.querySelector('[data-id="cancel"]');
        this.elModalClose = document.querySelector('.modal__header .button--close');
        this.elModalContent = document.querySelector('.modal__content');
        this.elModalBox = this.elModal.querySelector('.modal__box');
        this.elModalNavigationArrow = this.elModal.querySelector('.navigation-change');
        this.elModalNavigationArrowLeft = this.elModalNavigationArrow.querySelector('[data-id="previous"]');
        this.elModalNavigationArrowRight = this.elModalNavigationArrow.querySelector('[data-id="next"]');
        this.elGallery = document.querySelectorAll('.gallery');
    }

    build() {
        this.buildHtml();
        this.update();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.buildTranslation();
    }

    buildHtml() {
        const string = `
            <div class="modal ${this.cssClose}">
                <div class="modal__box">
                    <header class="modal__header right">
                        <button type="button" aria-label="${window.translation.translation.close}" class="button button--small button--small--proportional button--grey button--transparent button--close">
                            <svg class="icon icon--regular rotate-45">
                                <use xlink:href="./assets/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div class="modal__content"></div>
                    </div>
                    <div class="navigation-change button-wrapper row center ${this.cssHide}">
                        <button type="button" class="button button--big" data-id="previous" aria-label="${window.translation.translation.previous}" >
                            <svg class="icon icon--extra-big icon--white">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                        <button type="button" class="button button--big" data-id="next" aria-label="${window.translation.translation.next}" >
                            <svg class="icon icon--extra-big icon--white rotate-180">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                    </div>
                    <footer class="button-wrapper modal__footer center ${this.cssHide}">
                        <button type="button" class="button button--regular button--green" data-id="confirm"></button>
                        <button type="button" class="button button--regular button--grey" data-id="cancel"></button>
                    </footer>
                </div>
            </div>
        `;

        this.elBody.insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        this.elModalFooterConfirm.innerHTML = window.translation.translation.confirm;
        this.elModalFooterCancel.innerHTML = window.translation.translation.cancel;
    }

    buildKeyboard() {
        window.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                if (this.isModalOpen) {
                    this.closeModal();
                }
            }

            if (event.key === 'ArrowLeft') {
                if (!this.isModalOpen) {
                    return;
                }
                if (this.elModalNavigationArrowLeft.classList.contains(this.cssHide)) {
                    return;
                } else {
                    this.elModalNavigationArrowLeft.click();
                }
            }

            if (event.key === 'ArrowRight') {
                if (!this.isModalOpen) {
                    return;
                }
                if (this.elModalNavigationArrowRight.classList.contains(this.cssHide)) {
                    return;
                } else {
                    this.elModalNavigationArrowRight.click();
                }
            }
        });
    }

    buildMenuGallery() {
        if (!this.elGallery) {
            return;
        }

        Array.prototype.forEach.call(this.elGallery, (item) => {
            let button = item.querySelectorAll('a');

            Array.prototype.forEach.call(button, (itemBt) => {
                itemBt.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.buildModal('gallery', false, 'full');
                    this.buildGalleryImage(itemBt.getAttribute('href'), itemBt.querySelector('img').getAttribute('data-description'));
                    this.buildGalleryNavigation(itemBt);
                });
            });
        });

        this.elModalNavigationArrowLeft.addEventListener('click', () => {
            this.targetBuildGalleryChange.previousElementSibling.click();
        });

        this.elModalNavigationArrowRight.addEventListener('click', () => {
            this.targetBuildGalleryChange.nextElementSibling.click();
        });
    }

    buildMenu() {
        this.elModalClose.addEventListener('click', () => {
            this.closeModal();
        });

        document.addEventListener('click', (event) => {
            let isButton = event.target.matches('button *, a *');

            if (isButton) {
                return;
            }
        });

        this.elModalFooter.querySelector('[data-id="cancel"]').addEventListener('click', () => {
            this.closeModal();
        });
    }

    buildGalleryNavigation(target) {
        let array = [];
        let currentGallery = target.parentNode.parentNode;
        let siblingLength = currentGallery.querySelectorAll('a').length - 1;

        Array.prototype.forEach.call(currentGallery.querySelectorAll('a'), (item) => {
            array.push(item);
        });

        let currentPosition = array.indexOf(target);

        if (siblingLength > 0) {
            this.elModalNavigationArrow.classList.remove(this.cssHide);
            this.targetBuildGalleryChange = target;

            if (currentPosition <= 0) {
                this.elModalNavigationArrowLeft.classList.add(this.cssHide);
            } else {
                this.elModalNavigationArrowLeft.classList.remove(this.cssHide);
            }

            if (currentPosition >= siblingLength) {
                this.elModalNavigationArrowRight.classList.add(this.cssHide);
            } else {
                this.elModalNavigationArrowRight.classList.remove(this.cssHide);
            }

        } else {
            this.elModalNavigationArrow.classList.add(this.cssHide);
        }
    }

    buildModal(obj) {
        this.elModalFooter.classList.add(this.cssHide);
        typeof obj.action === 'undefined' ? this.openModal() : this.closeModal();
        typeof obj.click !== 'undefined' ? this.buildContentConfirmationAction(obj.click) : '';
        this.buildModalSize(obj.size);
        this.buildModalKind(obj);
    }

    buildModalKind(obj) {
        if (obj.kind === 'ajax') {
            this.buildContentAjax(obj.content);
        }

        if (obj.kind === 'confirmation') {
            this.buildContentConfirmation(obj.content);
        }

        switch (obj.kind) {
            case 'gallery':
                this.elModalNavigationArrow.classList.remove('hide');
                break;
            default:
                this.elModalNavigationArrow.classList.add('hide');
                break;
        }
    }

    openModal() {
        this.isModalOpen = true;
        this.elBody.classList.remove('overflow-y');
        this.elBody.classList.add('overflow-hidden');
        this.elBody.style.overflowY = 'hidden';
        this.elModal.classList.remove(this.cssClose);
        this.elModalBox.classList.add('modal-animate');
    }

    closeModal() {
        this.isModalOpen = false;
        this.elBody.classList.add('overflow-y');
        this.elBody.classList.remove('overflow-hidden');
        this.elBody.style.overflowY = 'auto';
        this.elBody.style.position = 'relative';
        this.elModal.classList.add(this.cssClose);
        this.elModalBox.classList.remove('modal-animate');
        this.resetOtherClass();
    }

    buildModalSize(size = 'regular') {
        const prefix = 'modal--';
        const arr = ['extra-small', 'small', 'regular', 'big', 'extra-big', 'full'];

        Array.prototype.forEach.call(arr, (item) => {
            this.elModalBox.classList.remove(`${prefix}${item}`);
        });

        this.elModalBox.classList.add(`${prefix}${size}`);
    }

    buildContentAjax(target) {
        let self = this;
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                self.elModalContent.innerHTML = this.responseText;
                self.resetOtherClass();
            }
        };

        ajax.open('GET', target, true);
        ajax.send();
    }

    buildGalleryImage(image, description) {
        const stringImage = `<img src="${image}" class="img-responsive" style="margin:auto;" title="" alt=""/>`;

        this.elModalContent.innerHTML = stringImage;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        const string = `<div class="center">${content}</div>`;

        this.elModalFooter.classList.remove(this.cssHide);
        this.elModalContent.innerHTML = string;
    }

    buildContentConfirmationAction(action) {
        this.elModalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        if (description === '' || description === null) {
            return;
        }

        const string = `<p class="modal__description">${description}</p>`;

        if (typeof description !== typeof 'undefined') {
            this.elModalContent.insertAdjacentHTML('beforeend', string);
        }
    }

    resetOtherClass() {
        if (typeof window.menuDropDown !== 'undefined') {
            window.menuDropDown.reset();
        }

        if (typeof window.menuToggle !== 'undefined') {
            window.menuToggle.build();
        }

        if (typeof window.menuTab !== 'undefined') {
            window.menuTab.build();
        }

        if (typeof window.lazyLoad !== 'undefined') {
            window.lazyLoad.build();
        }
    }
}

export {
    Modal
};