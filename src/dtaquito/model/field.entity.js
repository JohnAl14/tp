export class Field {
    constructor(id, name, price, rating, image,author,descripcion, capacidad ) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.author = author;
        this.descripcion = descripcion;
        this.capacidad = capacidad;
    }

    static FromDisplayableField(displayableField) {
        return new Field(
            displayableField.id,
            displayableField.image,
            displayableField.name,
            displayableField.price,
            displayableField.rating,
            displayableField.author,
        );
    }

    static toDisplayableField(field) {
        return {
            id: field.id,
            image: field.image,
            name: field.name,
            price: field.price,
            rating: field.rating,
            author: field.author,
        };
    }
}
