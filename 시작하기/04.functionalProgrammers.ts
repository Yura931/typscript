/*
* 내장 타입(Built-in types)
* JavaScript 에서는 7개의 내장 타입을 정의한다.
*
* Number        - 배정밀도 IEEE 754 부동소수점
* String        - 수정 불가능한 UTF-16 문자열
* Boolean       - true 와 false
* Symbol        - 보통 키로 사용하는 고유한 값
* Null          - 단위 타입과 동등
* Undefined     - 단위 타입과 동등
* Object        - 레코드와 유사한 것
*
* TypeScript 내장 원시 타입
* number
* string
* boolean
* symbol
* null
* undefined
* object
*
* 다른 중요한 TypeScript 타입(Other important TypeScript types)
* unknown       - 최상위 타입
* never         - 하위 타입
* 객체 리터럴     - 예, { property: Type }
* void          - 리턴 타입으로 사용하기 위해 의도된 undefined의 서브타입
* T[]           - 수정가능한 배열들, 또한 Array<T>로 사용 가능
* [T, T]        - 고정된 길이지만 수정 가능한 튜플
* (t: T) => U   - 함수
* */

// 함수 구문에는 매개변수 이름이 포함되어 있다.
let fst: (a: any, d: any) => any = (a, d) => a;
let snd: <T, U>(a: T, d: U) => U = (a, d) => d;

// 객체 리터럴 타입 구문이 객체 리터럴 값 구문과 꽤 유사하다.
let o: { n: number; xs: object[] } = { n: 1, xs: [] };

// [T, T]는 T[]의 서브타입이다.

/*
* 박스 형태 타입(Boxed types)
* JavaScript는 프로그래머들이 해당 타입에 접근할 수 있는 메서드를 포함하는 원시타입을 동등하게 박스해 왔다.
* 원시 형태의 number, 박스 형태 타입의 Number
* 박스 형태 타입은 메서드가 원시 타입을 반환할 때 아주 드물게 필요하다
* */

(1).toExponential();
Number.prototype.toExponential.call(1);

// 숫자 리터럴에서 메서드를 호출하려면 파서를 지원하기 위해 메서드를 괄호 안에 넣어야 한다.

/*
* 점진적인 타이핑(Gradual typing)
*
* TypeScript는 표현식의 타입을 알 수 없을 때마다 any 타입을 사용한다.
* any[] 에 어떤 값이든 체크하지 않고 넣어도 상관없다.
*
* any 사용 시 에러가 발생하면 tsconfig.json 에서
* "noImplicitAny": true 또는 "strict": true를 설정해야 한다.
* */

const anys : any[] = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });

// anys.map(anys[2]);  // 에러, 함수가 아님

let sepsis = anys[0] + anys[1];


/*
* 구조적인 타이핑(Structural typing)
* */

let o1 = { x: "hi", extra: 1 };
let o2: { x :string } = o1;
/*
* 객체 리터럴 { x: "hi", extra: 1 } 에 매치되는 { x: string, extra: number }
* 이 타입은 필수 프로퍼티가 모두 있고 해당 프로퍼티에 할당 가능한 타입이 있으므로 { x: string } 에 할당 가능
* 나머지 프로퍼티는 할당을 막지 않고 { x: string } 의 서브타입으로 만든다.
* */

type One = { p: string };
interface Two {
    p: string;
}

class Three {
    p = "Hello";
}

let x:One = { p: "hi" };
let two:Two = x;
console.log('x: ', x);
two = new Three();
console.log('two: ', two);

/*
* 유니언(Unions)
* */

function start(
    arg: string | string[] | (() => string) | { s: string }
): string {
    // JavaScript 에서 아주 일반적
    if (typeof arg === "string") {
        return commonCase(arg);
    } else if (Array.isArray(arg)) {
        return arg.map(commonCase).join(",");
    } else if (typeof arg === "function") {
        return commonCase(arg());
    } else {
        return commonCase(arg.s);
    }

    function commonCase(s: string): string {
        return s;
    }
}

let arg1 = "string";
let arg2 = ["s", "t", "r", "i", "n", "g"];
let arg3 = () => "function string";
let arg4 = { s : "obj string" };

console.log('arg1: ', start(arg1));
console.log('arg2: ', start(arg2));
console.log('arg3: ', start(arg3));
console.log('arg4: ', start(arg4));

/*
* 교집합
* */
type Combined = { a: number } & { b: string; };
type Conflicting = { a: number } & { a: string };

let combined: Combined = { a: 1, b: "string" };
console.log('combined: ', combined);

/*
* 유닛 타입(Unit types)
* 하나의 원시 값을 포함하고 있는 원시 타입의 서브타입
* 하나의 특정 값만을 허용하는 타입
* */

declare function pad(s: string, n: number, direction: "left" | "right"): string;
pad("hi", 10, "left");

let s:string = "right"; // string 타입과 "left" | "rigth" 는 다름
// pad("hi", 10, s);   오류: 'string' 은 '"left" | "right"'에 할당할 수 없다.

let s2: "left" | "right" = "right"; // 타입 표기를 하여 left, right 타입이 아닌 변수가 s2에 할당되는 것을 방지
pad("hi", 10, s2);

/*
* 문맥적인 타이핑 (Contextual typing)
* */

declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);
// T, U는 호출 전에 추론되지 않음, [1, 2, 3] 으로 T = number를 추론한 다음 n => n.toString()의 리턴 타입으로 U=string을 추론,
// sns 가 string[] 타입을 가지도록 함

declare function map2<T, U>(ts: T[], f: (t: T) => U): U[];
// 문맥을 통해 리턴 타입 추론

declare function run<T>(thunk: (t: T) => void): T;
let i: { inference: string } = run((o) => {
    o.inference = "INSERT STATE HERE";
});

/*
* 선언 이니셜라이저는 선언 타입: { inference: string } 에 따라서 문맥적으로 타입이 정해짐
* 호출의 리턴 타입은 추론을 위해 문맥적인 타입을 사용하기 때문에 컴파일러는 T={ inference: string } 으로 추론
* 화살표 함수는 매개변수에 타입을 지정하기 위해 문맥적인 타입을 사용하므로, 컴파일러는 o: { inference: string } 를 제공
* */

/*
* 타입 별칭(Type aliases)
* 단순한 별칭
* */

type Size = [number, number];
let xs: Size = [101.1, 999.9];

type FString = string & { __compileTimeOnly: any }; // 교차 타입, A 이면서 B인 타입
/*
* 런타임에서는 그냥 string, 컴파일 타임(TypeScript 타입 검사) 에서는 "특별한 string"으로 취급하겠다는 것
* string인 동시에 __compileTimeOnly 라는 프로퍼티를 가진 타입
* 이 프로퍼티는 실제로 존재하지 않아도 됨
* 컴파일 타임에만 존재하는 가짜 태그
* */

let f: FString;
let st: string;

st = f; // 가능
/*
* FString은 "string + α"
* string이 요구하는 조건을 이미 만족
* 더 구체적인 타입 -> 일반적인 타입 / 허용
* */

// f = st; 불가능
/*
* FString은 __compileTimeOnly 라는 "태그"가 필요
* 일반 string 에는 태그가 없음
* 일반적인 타입 -> 더 구체적인 타입 / 거부
* */

function makeFString(s: string): FString {
    return s as FString;
}

/*
* 왜 이렇게 쓰나?
* 이메일 문자열
* 사용자 ID
* HTML-safe string
* SQL-safe string
* */

type UserId = string & { readonly __userId: unique symbol };
type Email = string & { readonly __email: unique symbol };

/*
* string & { tag } = 컴파일 타임 전용 라벨이 붙은 string
* TypeScript식 newtype 흉내
* */

/*
* 판별 유니언(Discriminated Unions)
* */

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number, y: number };

/*
 * kind가 리터럴 타입("circle" | "square" | "triangle") 을 가지며
 * 모든 멤버가 공통으로 kind 라는 속성을 가짐
 * 이 조합을 판별 유니언이라고 부른다.
 *
 * kind 값을 검사하면 TypeScript가 자동으로 나머지 필드를 추론한다.
 */


// TypeScript는 조건문을 따라가며 s의 타입을 점점 좁힌다.
function area(s: Shape) {
    if(s.kind === "circle") {
        // s: { kind: "circle", radius: number }
        return Math.PI * s.radius * s.radius;
    } else if (s.kind === "square") {
        // s: { kind: "square", x: number }
        return s.x * s.x;
    } else {
        // s: { kind: "triangle", x: number, y: number } = 앞의 두 경우 제외, 남은 경우는 triangle 뿐 이라는 것을 TS가 안다.
        return (s.x * s.y) / 2;
    }
}
/*
* area()의 리턴타입이 number인 이유
* TypeScript는 다음을 확인
* - 모든 코드 경로에서 return이 존재하는가? = 모든 경로에서 number를 반환, 빠지는 케이스 없음
* - 각 return의 타입이 무엇인가?
* 리턴 타입 number로 추론
* function area(s: Shape): number - 리턴타입을 명시적으로 쓰지 않아도 동일하다.
* */

function area2(s: Shape): number | undefined {
    if (s.kind === "circle") {
        return Math.PI * s.radius * s.radius;
    } else if (s.kind === "square") {
        return s.x * s.x;
    }
    // triangle 처리 안함 → undefined
}

function area3(s: Shape): number {
    switch (s.kind) {
        case "circle":
            return Math.PI * s.radius * s.radius;
        case "square":
            return s.x * s.x;
        case "triangle":
            return (s.x * s.y) / 2;
        default:
            return shapeNever(s);
    }
}

function shapeNever(s: never): never {
    throw new Error('error');
}

function height(s: Shape) {
    if (s.kind === "circle") {
        return 2 * s.radius;
    } else {
        return s.x;
    }
}

/*
* 타입 매개변수(type Parameters)
* 대부분의 C-계열 언어처럼, TypeScript는 타입 매개변수의 선언을 요구한다.
*
* 대소문자에 대한 요구 조건은 없지만, 타입 매개 변수는 일반적으로 단일 대문자이다.
* 타입 매개 변수는 타입 클래스 제약과 비슷하게 동작하는 타입으로 제한될 수 있다.
* 타입 매개변수는 매개변수를 같은 타입으로 제한하는 것처럼 타입 정보를 전파하는데만 쓰여야 한다.
* */

function lifeArray<T>(t: T): Array<T> {
    return [t];
}

function firstish<T extends { length: number }>(t1: T, t2: T): T {
    return t1.length > t2.length ? t1 : t2;
}

// T는 필요하지 않다. 오직 한 번만 참조되며, 다른 매개변수나 리턴 값의 타입을 제한하는데 사용되지 않는다는 것을 알아둬야 한다.
function length1<T extends ArrayLike<unknown>>(t: T): number {
    return 0;
}

function length2(t: ArrayLike<unknown>): number {
    return 1;
}

/*
* 상위 유형의 타입(Higher-kinded types)
* TypeScript는 상위 유형의 타입이 없다.
* function length<T extends ArrayLike<unknown>, U>(m: T<U>) {} 허용하지 않음
* */

/*
* readonly와 const
* JavaScript 에서 수정 가능함이 기본이지만, 참조가 수정 불가능함을 선언하기 위해 const로 변수를 선언할 수 있다.
* 참조 대상은 여전히 수정 가능하다.
* */

const a = [1, 2, 3];
a.push(102);
a[0] = 101;

console.log('a: ', a);

/*
* TypeScript는 추가적으로 프로퍼티에 readonly 제어자를 사용할 수 있다.
* */

interface Rx {
    readonly x: number;
}

let rx: Rx = { x: 1};
console.log('x: ', x);
// rx.x = 12; error 읽기만 가능

interface X {
    x: number;
}

// 매핑된 타입 Readonly<T>는 모든 프로퍼티를 readonly로 만들어 버린다.
let rx2: Readonly<X> = { x: 1 };
// rx2.x = 12; 에러


let a1: ReadonlyArray<number> = [1, 2, 3];
let b1: readonly number[] = [1, 2, 3];
/*
* a1.push(102);
* b1[0] = 10;
* 둘 다 에러
*/

/*
* 배열과 객체 리터럴에서 동작하는ㄴ const-assertion만 사용할 수 있다.
* */
let a2 = [1, 2, 3,] as const;
/*
* a2.push(102);
* a2[0] = 101; 에러
* */





