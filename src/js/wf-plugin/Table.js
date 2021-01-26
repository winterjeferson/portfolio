class Table {
    constructor() {
        this.elTable = document.querySelectorAll('.table');
        this.cssResponsive = 'table-responsive';
    }

    build() {
        if (this.elTable.length < 1) {
            return;
        }

        this.buildResponsive();
    }

    buildResponsive() {
        Array.prototype.forEach.call(this.elTable, (item) => {
            window.helper.wrapItem(item, this.cssResponsive);
            window.helper.wrapItem(item.parentNode.parentNode.querySelector(`.${this.cssResponsive}`), `wrapper-${this.cssResponsive}`);
        });
    }
}

export {
    Table
};