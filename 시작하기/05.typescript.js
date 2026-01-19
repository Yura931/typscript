function greeter(person) {
    return "Hello, World!" + person;
}
var user = "Jane User";
document.body.textContent = greeter(user);
var user2 = [0, 1, 2, 3];
function greeter2(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user3 = { firstName: "Jane", lastName: "User" }; // 인터페이스가 요구하는 형태 사용
var user3_2 = { firstName: "Jane", lastName: "User" }; // 인터페이스 명시
document.body.textContent = greeter2(user3);
document.body.textContent = greeter2(user3_2);
/*
* 클래스 (Classes)
* TypeScript는 클래스 기반 객체 지향 프로그래밍 지원과 같은 JavaScript의 새로운 기능을 지원한다.
* */
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var user4 = new Student("Jane", "M.", "User");
document.body.textContent = greeter2(user4);
