export class Card {
    constructor(id, cardNumber, expiryDate, cardHolder, cardIssuer,cvv,userId,balance) {
        this.id = id;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cardHolder = cardHolder;
        this.cardIssuer = cardIssuer;
        this.cvv = cvv;
        this.userId = userId;
        this.balance = balance;
    }

    static FromDisplayableCard(displayableField) {
        return new Card(
            displayableField.id,
            displayableField.cardNumber,
            displayableField.expiryDate,
            displayableField.cardHolder,
            displayableField.cardIssuer,
            displayableField.cvv,
            displayableField.userId,
            displayableField.balance
        );
    }

    static toDisplayableCard(balance) {
        return {
            id: balance.id,
            cardNumber: balance.cardNumber,
            expiryDate: balance.expiryDate,
            cardHolder: balance.cardHolder,
            cardIssuer: balance.cardIssuer,
            cvv: balance.cvv,
            userId: balance.userId,
            balance: balance.balance
        };
    }
}
