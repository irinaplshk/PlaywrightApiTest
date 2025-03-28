import {  faker } from '@faker-js/faker';
const xmlFormat = '<todo><doneStatus>true</doneStatus><title>file paperwork today</title></todo>';

export class Data {
    constructor() {
        this.data = {}; // Хранит только те свойства, которые были добавлены
    }

    addTitle(symbols = 0) {
        this.data['title'] = faker.string.alpha(symbols);
        return this;
    }
    addStatus( status = true) {
        this.data['doneStatus'] = status;
        return this;
    }
    addDescription(symbols = 0) {
        this.data['description'] = faker.string.alpha(symbols);
        return this;
    }
    addPriority(symbols = 0) {
        this.data['priority'] = faker.string.alpha(symbols);
        return this;
    }
    addId(number = 0) {
        this.data['id'] = number;
        return this;
    }
    addXML(textXML = xmlFormat) {

        this.data.textXML  = textXML;
        return this;
    }
    generate() {
        return this.data;
    }
}