export class Theme {
    init() {
        setInterval(this.buildSkill, 80);
    }

    buildSkill() {
        const attribute = 'data-width';
        const elWrapper = document.querySelector('.grid__content-dark').querySelectorAll(`[${attribute}]`);
        const attributeCurrent = attribute + '-current';
        const encrease = 2;
        const decrease = 15;

        elWrapper.forEach(el => {
            const valueMax = Number(el.getAttribute(attribute));
            let valueCurrent = Number(el.getAttribute(attributeCurrent));

            if (valueCurrent >= valueMax - encrease) {
                valueCurrent = valueCurrent - decrease;
            }

            valueCurrent += encrease;

            if (valueCurrent < valueMax) {
                el.setAttribute(attributeCurrent, valueCurrent);
                el.setAttribute('style', `transform: scaleX(${valueCurrent}%) translate(0, 0)`);
            }
        });
    }
}