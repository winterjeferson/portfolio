export class Theme {
    init() {
        setInterval(this.buildSkill, 200);
    }

    buildSkill() {
        const attribute = 'data-width';
        const elWrapper = document.querySelector('.grid__content-dark').querySelectorAll(`[${attribute}]`);
        const attributeCurrent = attribute + '-current';
        const encrease = 5;
        const decrease = 7;

        elWrapper.forEach(el => {
            const valueMax = Number(el.getAttribute(attribute));
            let valueCurrent = Number(el.getAttribute(attributeCurrent));

            if (valueCurrent >= valueMax - encrease) {
                valueCurrent = valueCurrent - decrease;
            }

            valueCurrent += encrease;

            if (valueCurrent < valueMax) {
                el.setAttribute(attributeCurrent, valueCurrent);
                el.setAttribute('style', `width: ${valueCurrent}%`);
            }
        });
    }
}