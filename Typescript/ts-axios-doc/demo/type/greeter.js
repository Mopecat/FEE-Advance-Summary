var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return User;
}());
function greeter(person) {
    return "Hello " + person.fullName;
}
var user = new User("yang", "liu");
console.log(greeter(user));
