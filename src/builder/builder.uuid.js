import { fakerRU as faker } from '@faker-js/faker';

export class UUID {
    constructor() {
        this.uuid = {}; // Хранит только те свойства, которые были добавлены
    }

    addUuid() {
        this.uuid.uuid = faker.string.uuid();
        return this;
    }
    
    generate() {
        return this.uuid;
    }
}