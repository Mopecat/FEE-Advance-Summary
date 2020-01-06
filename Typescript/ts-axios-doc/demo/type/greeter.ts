interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
}

class User {
  fullName: string;
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + " " + lastName;
  }
}

function greeter(person: Person) {
  return "Hello " + person.fullName;
}

let user = new User("yang", "liu");

console.log(greeter(user));
