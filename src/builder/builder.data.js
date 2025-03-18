
export class Data {
    constructor() {
        this.data = {}; // Хранит только те свойства, которые были добавлены
    }

    addTitle(text = '') {
        this.data['title'] = text;
        return this;
    }
    addStatus(boolean  = '') {
        this.data['doneStatus'] = boolean;
        return this;
    }
    addDescription(text = '') {
        this.data['description'] = text;
        return this;
    }
    addPriority(text = '') {
        this.data['priority'] = text;
        return this;
    }
    addId(number = '') {
        this.data['id'] = number;
        return this;
    }
    addXML(text = '') {
        this.data['id'] = text;;
        return this;
    }
    generate() {
        return this.data;
    }
}