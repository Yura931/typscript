function greeter(person: string) {
    return "Hello, World!" + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);

let user2 = [0, 1, 2, 3];
// document.body.textContent = greeter(user2); // 컴파일 오류 error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.


/*
* firstName, lastName 필드를 갖고 있는 객체를 나타내는 인터페이스를 사용
* TypeScript 에서, 내부 구조가 호환되는 두 타입은 서로 호환 된다.
* 명시적인 implements 절 없이, 인터페이스가 요구하는 형태를 사용하는 것만으로도 인터페이스를 구현할 수 있다.
* */
interface Person {
    firstName: string;
    lastName: string;
}

function greeter2(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user3 = { firstName: "Jane", lastName: "User" };  // 인터페이스가 요구하는 형태 사용
let user3_2: Person = { firstName: "Jane", lastName: "User" };  // 인터페이스 명시
document.body.textContent = greeter2(user3);
document.body.textContent = greeter2(user3_2);

/*
* 클래스 (Classes)
* TypeScript는 클래스 기반 객체 지향 프로그래밍 지원과 같은 JavaScript의 새로운 기능을 지원한다.
* */

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string ) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

let user4 = new Student("Jane", "M.", "User");
document.body.textContent = greeter2(user4);
