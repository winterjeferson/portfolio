class Carousel {
    constructor() {
        this.attCurrentSlide = 'data-current-slide';
        this.attPrevious = '[data-id="previous"]';
        this.attNext = '[data-id="next"]';
        this.cssCarouselList = 'carousel__list';
        this.cssCarouselListItem = 'carousel__item';
        this.cssCarouselController = 'carousel__controller';
        this.cssButton = 'carousel__controller-button';
        this.cssButtonActive = `${this.cssButton}--active`;
        this.cssDisplay = 'hide';
        this.cssTransition = '.7s';
        this.elCarousel = document.querySelectorAll('.carousel');

        this.counterCurrent = 0;
        this.transition = 5;
        this.isAutoplay = true;
    }

    build() {
        if (this.elCarousel.length < 1) {
            return;
        }

        this.buildLayout();
        this.buildNavigation();
        this.watchResize();
    }

    buildAutoplay() {
        if (this.isAutoplay) {
            this.interval = setInterval(this.verifyInterval, 1000);
            this.isAutoplay = false;
        }
    }

    buildLayout() {
        const self = this;

        Array.prototype.forEach.call(this.elCarousel, (item) => {
            let length = item.querySelectorAll(`.${self.cssCarouselList} .${this.cssCarouselListItem}`).length;
            let autoplay = item.getAttribute('data-autoplay');

            if (autoplay === 'true') {
                self.buildAutoplay();
            }

            self.resizeLayout(item);
            self.buildLayoutController(item, length);
            self.defineActive(item.querySelector('[data-id="' + item.getAttribute(self.attCurrentSlide) + '"]'));

            if (length === 1) {
                item.querySelector(self.attPrevious).classList.add(self.cssDisplay);
                item.querySelector(self.attNext).classList.add(self.cssDisplay);
                item.querySelector(`.${self.cssCarouselController}`).classList.add(self.cssDisplay);
            }
        });
    }

    watchResize() {
        const self = this;

        window.onresize = () => {
            Array.prototype.forEach.call(self.elCarousel, (item) => {
                let el = item.parentNode.parentNode.parentNode.parentNode;
                let elCarouselList = el.querySelector(`.${self.cssCarouselList}`);
                let newSlide = 0;

                self.defineActive(el.querySelector(`[data-id="${newSlide}"]`));
                self.animate({
                    'currentSlide': newSlide,
                    'target': elCarouselList,
                    'from': 'arrow'
                });
            });
        };
    }

    buildLayoutController(target, length) {
        const css = `button button--small button--small--proportional ${this.cssButton}`;
        let concat = '';

        for (let i = 0; i < length; i++) {
            concat += `
                <button type="button" class="${css}" data-id="${i}" aria-hidden="true"></button>
            `;
        }

        target.querySelector(`.${this.cssCarouselController}`).innerHTML = concat;
    }

    buildNavigation() {
        Array.prototype.forEach.call(this.elCarousel, (item) => {
            this.buildNavigationController(item);
            this.buildNavigationArrowLeft(item);
            this.buildNavigationArrowRight(item);
        });
    }

    buildNavigationController(target) {
        const button = target.querySelectorAll(`.${this.cssButton}`);

        Array.prototype.forEach.call(button, (item) => {
            item.onclick = () => {
                this.defineActive(item);
                this.animate({
                    'currentSlide': item.getAttribute('data-id'),
                    'target': item,
                    'from': 'navigation'
                });
            };
        });
    }

    buildNavigationArrow(obj) {
        const self = this;

        obj.button.onclick = () => {
            const elCarousel = obj.button.parentNode.parentNode;
            const elCarouselList = elCarousel.querySelector(`.${self.cssCarouselList}`);
            const elCarouselListLength = Number(elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`).length);
            const currentSlide = Number(elCarousel.getAttribute(self.attCurrentSlide));
            let slide = 0;

            if (obj.side === 'previous') {
                slide = currentSlide === 0 ? elCarouselListLength - 1 : currentSlide - 1;
            } else {
                slide = currentSlide === (elCarouselListLength - 1) ? 0 : currentSlide + 1;
            }

            elCarousel.setAttribute(self.attCurrentSlide, slide);
            self.defineActive(elCarousel.querySelector(`[data-id="${slide}"]`));
            self.animate({
                'currentSlide': slide,
                'target': elCarouselList,
                'from': 'arrow'
            });
        };
    }

    buildNavigationArrowLeft(target) {
        const button = target.querySelector(this.attPrevious);

        this.buildNavigationArrow({
            button,
            'side': 'previous'
        });
    }

    buildNavigationArrowRight(target) {
        const button = target.querySelector(this.attNext);

        this.buildNavigationArrow({
            button,
            'side': 'next'
        });
    }

    animate(obj) {
        const elCarouselList = obj.from === 'arrow' ?
            obj.target.parentNode.querySelector(`.${this.cssCarouselList}`) :
            obj.target.parentNode.parentNode.querySelector(`.${this.cssCarouselList}`);
        const elCarousel = elCarouselList.parentNode;
        const carouselStyle = elCarousel.getAttribute('data-style');
        const slideSize = Number(elCarouselList.querySelector(`.${this.cssCarouselListItem}`).offsetWidth);
        const currentSlide = obj.currentSlide;
        const currentPosition = Number(currentSlide * slideSize);

        switch (carouselStyle) {
            case 'fade':
                this.animateFade({
                    elCarouselList,
                    currentPosition,
                    currentSlide,
                });
                break;
            default:
                this.animateSlide({
                    elCarouselList,
                    currentPosition,
                });
                break;
        }
    }

    animateFade(obj) {
        const el = obj.elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`);

        Array.prototype.forEach.call(el, (item) => {
            item.style.opacity = 0;
            item.style.transition = this.cssTransition;
        });

        el[obj.currentSlide].style.opacity = 1;
        el[obj.currentSlide].style.left = `-${obj.currentPosition}px`;
        el[obj.currentSlide].style.transition = this.cssTransition;
    }

    animateSlide(obj) {
        obj.elCarouselList.style.transform = `translateX(-${obj.currentPosition}px)`;
    }

    verifyInterval() {
        const self = window.carousel;

        self.counterCurrent++;

        if (self.counterCurrent >= self.transition) {
            self.counterCurrent = 0;

            Array.prototype.forEach.call(self.elCarousel, (item) => {
                const autoplay = item.getAttribute('data-autoplay');

                if (autoplay === 'true') {
                    item.querySelector(self.attNext).click();
                }
            });
        }
    }

    defineActive(target) {
        const el = target.parentNode.parentNode.querySelectorAll(`.${this.cssButton}`);

        Array.prototype.forEach.call(el, (item) => {
            item.classList.remove(this.cssButtonActive);
        });

        target.classList.add(this.cssButtonActive);
    }

    resizeLayout(target) {
        const elCarouselList = target.querySelector(`.${this.cssCarouselList}`);
        const elCarouselListItem = elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`);
        const length = elCarouselListItem.length;

        elCarouselList.style.width += `${length * 100}%`;
    }
}

export {
    Carousel
};