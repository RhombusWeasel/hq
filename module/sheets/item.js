export default class DCItem extends ItemSheet {
    get template() {
        return `systems/hq/templates/sheets/items/${this.item.data.type}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        return data;
    }

    activateListeners(html) {
        return super.activateListeners(html);
    }
}