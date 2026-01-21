/*
* Boolean
* Number
* String
* Array
* Tuple
* Enum
* Any
* Void
* Null and Undefined
* Never
* Object
* Type assertions(타입 단언)
*
* TypeScript는 JavaScript와 거의 동일한 데이터 타입을 지원하며, 열거 타입을 사용하여 더 편리하게 사용할 수 있다.
* */

// Boolean (true / false)
let isDone: boolean = false;

/*
* Number
* JavaScript 처럼, TypeScript의 모든 숫자는 부동 소수 값이다.
* 부동 소수에는 number 타입이 붙혀진다.
* TypeScript는 16진수, 10진수 리터럴과, ECMAScript 2015에 소개된 2진수, 8진수 리터럴도 지원한다.
* */
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

/*
* String
* 텍스트 데이터 타입을 string 으로 표현
* 큰따옴표나 작은따옴표를 문자열 데이터 감싸는데 사용
* 템플릿 문자열을 사용하면 여러 줄에 걸쳐 문자열을 작성할 수 있으며, 표현식을 포함 시킬 수 있다.
* 백틱/백쿼트로 감싸지며 ${ expr }과 같은 형태로 표현식 포함
* */
let color: string = "blue";
color = 'red';
let fullName: string = `Bob Bobbing ton`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }
I'll be ${ age + 1 } years old next month.`;

let sentence2: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

/*
* Array
* 배열 타입 쓰는 방법
* 1. 배열 요소들을 나타내는 타입 뒤에 []를 쓰는 것
* 2. 제네릭 배열 타입을 쓰는 것
* */
let list1: number[] = [1, 2, 3,];
let list2: Array<number> = [1, 2, 3];

/*
* Tuple
* 요소의 타입과 개수가 고정된 배열을 표현할 수 있다.
* 요소들의 타입이 모드 같을 필요 없음
* number, string이 쌍으로 있는 값을 나타낼 수 있다.
* */
let tuple: [string, number];    // 튜플 타입으로 선언
tuple = ["hello", 10]   // 초기화

tuple[0].substring(1);  // 정해진 인덱스에 위치한 요소에 접근

/*
* Enum(열거)
* C# 같은 언어처럼, 집합에 더 나은 이름을 붙여줄 수 있다.
* enum은 0부터 시작해 번호를 매긴다.
* 하나의 값을 수동으로 설정하여 번호를 바꿀 수 있다.
* */
enum Color1 { Red, Green, Blue }
let c1: Color1 = Color1.Green;  // 번호 출력

enum Color2 { Red = 1, Green, Blue }
let c2: Color2 = Color2.Green;

enum Color3 { Red = 1, Green = 2, blue = 4 }  // 모든 값을 수도으로 설정할 수 있음
let c3: Color3 = Color3.Green;

// 매겨진 값을 사용해 enum 멤버의 이름을 알아낼 수 있다.
let colorName: string = Color3[2];
console.log('colorName: ', colorName);

/*
* Any
* 애플리케이션을 만들 때, 알지 못하는 타입을 표현해야 할 수도 있다.
* 이 경우 타입 검사를 하지 않고, 컴파일 타임에 검사 하도록 한다.
* */
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// any 타입은 타입의 일부만 알고 전체는 알지 못할 때 유용하다. 여러 다른 타입이 섞인 배열을 다룰 수 있다.
let listAny: any[] = [1, true, "free"];
listAny[1] = 100;

/*
* Void
* 어떤 타입도 존재할 수 없음을 나타냄
* 보통 함수에서 반환 값일 없을 때 반환 타입을 표현하기 위해 쓰인다.
* void를 타입 변수로 선언하는 것은 유용하지 않다.
* 변수에는 null 또는 undefined만 할당 할 수 있음
* */

function warnUser(): void {
    console.log("This is my warning message");
}

let unusable: void = undefined;
unusable = null;  // '--strictNullChecks' 사용하지 않을 때만

/*
* Null and Undefined
* TypeScript는 undefined, null 둘 다 각각 자신의 타입 이름으로 undefined, null로 사용한다.
* 기본적으로 null, undefined는 다른 모든 타입의 하위 타입이다.
* null과 undefined를 number 같은 타입에 할당할 수 있다는 것을 의미
*
* --strictNullChecks를 사용하면 any와 각자 자신들 타입에만 할당이 가능하다.(예외적으로 undefined는 void에 할당 가능)
* 많은 일반적인 에럴르 방지하는 데 도움을 준다.
* string 또는 null 또는 undefined를 허용하고 싶은 경우 유니언 타입인 string | null | undefined를 사용할 수 있다.
* */

// 이 밖에 이 변수들에 할당할 수 있는 값은 없다.
let u: undefined = undefined;
let n: null = null;

/*
* Never
* 절대 발생할 수 없는 타입을 나타냄
* 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 쓰임
* 변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 되면 never 타입을 가지게 될 수 있다.
*
* never 타입은 모든 타입에 할당 가능한 하위 타입이다.
* any를 포함한 다른 타입 모두 never에 할당 할 수 없다.
*
* never
* 함수가 절대 정상적으로 끝나지 않는 타입
* 함수가 정상적으로 종료되어 return 되거나 암묵적으로 끝나는 경우가 절대 없다
* 값을 반환하지도 않고
* undefined로 끝나지도 않고
* 항상 실행이 중단되거나, 영원히 실행 됨
* */

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
    throw new Error(message);
    // throw가 실행되는 순간 함수는 즉시 중단
    // 그 아래 코드나 함수 끝으로 절대 도달하지 않음
}

// 반환 타입이 never로 추론된다.
function fail() {
    return error("Something failed");
    // error()는 무조건 예외를 던짐
    // fail()도 정상 종료 불가능
    // TypeScript가 반환 타입을 never로 추론
    // 마지막 줄까지 갈 수 없음
}

function infiniteLoop(): never {
    while(true) {

    }
    // while(true)는 절대 끝나지 않음
    // 함수가 종료된 기회가 없음
    // 마지막에 도달 불가능
}

/*
* Object
* 원시 타입이 아닌 타입
* number, string, boolean, bigint, symbol, null, undefined가 아닌 나머지를 의미
* */

declare function create(o: object | null): void;

create( { prop: 0 });
create(null);

// 오류
// create(42);
// create("string");
// create(false);
// create(false);

/*
* Type assertions(타입 단언)
* TypeScript 보다 개발자가 값에 대해 더 잘 알고 있을 때
* 어떤 엔티티의 실제 타입이 현재 타입보다 더 구체적일 때 발생
*
* 타입 단언은 다른 언어의 타입 변환(형 변환)과 유사하지만, 다른 특별한 ㄱ머사를 하거나 데이터를 재구성하지는 않는다.
* 런타임에 영향을 미치지 않으며, 컴파일러만 사용
* */

// angle-bracket 문법
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;

// as 문법
let strLength2: number = (someValue as string).length;

// 위 두 예제는 동일하며 어떤 것을 사용할지는 주로 선호에 따른 선택
// TypeScript를 JSX와 함께 사용할 때는 as 문법만 허용된다.

