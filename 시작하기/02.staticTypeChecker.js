// TypeScript: 정적 타입 검사자(TypeScript: A Static Type Checker)
/*
* 프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 정적 검사라고 한다.
* 어떤 것이 오류인지와 어떤 것이 연산 되는 값에 기인하지 않음을 정하는 것
* 정적 타입 검사자인 TypeScript는 프로그램을 실행시키기 전에 값의 종류를 기반으로 프로그램의 오류를 찾는다.
* */

const staticTypeChecker = () => {

    // @errors: 2551 - TypeScript 에서 볼 수 있는 오류, obj 타입 때문
    const obj = { width: 10, height: 15};;
    const area = obj.width * obj.heigth;

}


/*
* TypeScript는 JavaScript와 어떤 관계일까?
*
* 구문(Syntax)
* TypeScript는 JS의 구문이 허용되는, JavaScript의 상위집합 언어이다.
*
* */

// @errors: 1005
// let a = (4 -> 닫는 괄호가 없음. 구문 오류

/*
* TypeScript는 독특한 구문 때문에 JavaScript 코드를 오류로 보지 않는다.
* 어떻게 작성되어있는지 모르지만 작동하는 JavaScript 코드를 TypeScript 파일에 넣어도 잘 작동한다.
*
* TypeScript는 다른 종류의 값들을 사용할 수 있는 방법이 추가된, 타입이 있는 상위 집합
* */

console.log(4 / []);    // 구문적으로 옳은(syntactically-lega) 코드, JavaScript 에서 NaN 출력

/*
* TypeScript 는 배열로 숫자를 나누는 연산이 옳지 않다고 판단하고 오류 발생시킴
*
* @errors: 2363
* console.log(4 / []);
*
*
* TypeScript는 컴파일-타임 타입 검사자가 있는 JavaScript의 런타임
* */



staticTypeChecker();

