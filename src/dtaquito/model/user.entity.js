export class User {
    constructor(id, name, lastname, age, role, email, password) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.role = role;
        this.email = email;
        this.password = password;
    }

    static FromDisplayableUser(displayableUser) {
        return new User(
            displayableUser.id,
            displayableUser.name,
            displayableUser.lastname,
            displayableUser.age,
            displayableUser.role,
            displayableUser.email,
            displayableUser.password,
        );
    }

    static toDisplayableUser(User) {
        return {
            id: User.id,
            name: User.name,
            lastname: User.lastname,
            age: User.age,
            role: User.role,
            email: User.email,
            password: User.password,
        };
    }
}