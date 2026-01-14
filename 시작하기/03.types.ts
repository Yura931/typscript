/*
* JavaScript는 이미 string, number, object, undefined 같은 원시 타입을 가지고 있지만,
* 전체 코드베이스에 일관되게 할당되었는지는 미리 확인해 주지 않는다.
* */

const types = () => {

    /*
    * 타입 추론(Types by Inference)
    * TypeScript는 JavaScript 언어를 알고 있으며 대부분의 경우 타입을 생성해 줄 것이다.
    * 변수를 생성하면서 동시에 특정 값을 할당하는 경우, TypeScript는 그 값을 해당 변수의 타입으로 사용할 것이다.
    * */

    let helloWorld = "Hello World"; // JavaScript가 동작하는 방식을 이해, 코드 타입 명시를 위해 추가로 문자를 사용할 필요가 없음
    
    
    /*
    * 타입 정의하기(Defining Types)
    * JavaScript는 다양한 디자인 패턴을 가능하게 하는 동적 언어
    * 몇몇 디자인 패턴은 자동으로 타입을 제공하기 힘들 수 있음
    * 이러한 경우 TypeScript는 타입이 무엇이 되어야 하는지 명시 가능한 JavaScript 언어의 확장을 지원
    * */
    
    // 추론 타입 객체
    const user = {
        name: "Hayes",
        id: 0,
    };


    // user 객체를 명시적으로 나타내기 위해 interface로 선언
    interface User {
        name: string;
        id: number;
    }
    
    // 변수 선언 뒤에 : TypeName 구문을 사용해 JavaScript 객체가 새로운 interface 형태를 따르고 있음을 선언
    const user2: User = {
        name: "Hayes",
        id: 0,
    };
    
    // @errors: 2322, 인터페이스에 맞지 않는 객체를 생성하면 경고
    const userError: User = {
//        username: "Hayes", 에러
        name: "Hayes",
        id: 0,
    };

    // JavaScript는 클래스와 객체 지향 프로그래밍 지원, TypeScript 또한 동일 - 인터페이스는 클래스로도 선언할 수 있다.
    class UserAccount {
        name: string;
        id: number;

        constructor(name: string, id: number) {
            this.name = name;
            this.id = id;

        }
    }

    const user3: User = new UserAccount("Murphy", 1);

    // 인터페이스는 함수에서 매개변수와 리턴 값을 명시하는데 사용되기도 한다.
    function getAdminUser(): User {
        return user3;
    }

    function deleteUser(user: User) {

    }

    /*
    * JavaScript 에서 사용할 수 있는 원시타입, 인터페이스에서 사용할 수 있다.
    * boolean, bigint, null, number, string, symbol, object, undefined
    *
    * TypeScript는 몇 가지를 추가해 목록을 확장한다.
    * any(무엇이든 허용), unknown(이 타입을 사용하는 사람이 타입이 무엇인지 선언했는가를 확인)
    * never(이 타입은 발생될 수 없음), void(undefined를 리턴하거나 리턴 값이 없는 함수)
    *
    * 타입을 구축하기 위한 두 가지 구문이 있다는 것을 알 수 있다.
    * interfaces and types - interface를 우선적으로 사용하고 특정 기능이 필요할 때 type 사용
    * */

    /*
    * 타입 구성(Composing Types)
    * 객체들을 조합하여 더 크고 복잡한 객체를 만드는 방법과 유사하게 TypeScript에 타입으로 이를 수행하는 도구가 있다.
    * 여러가지 타입을 이용하여 새 타입을 작성하기 위해 일상적인 코드에서 가장 많이 사용되는 두 가지 코드로는 유니언(Union)과 제네릭(Generic)이 있다.
    * */

    /*
    * 유니언(Unions)
    * 타입이 여러 타입 중 하나일 수 있음을 선언하는 방법
    * 예를 들어, boolean 타입을 true 또는 false로 설명할 수 있다.
    * */

    type MyBool = true | false;

    // 유니언 타입이 가장 많이 사용 된 사례 중 하나는 값이 string 또는 number의 리터럴집합을 가지는 것
    type WindowsStates = "open" | "closed" | "minimized";
    type LockStates = "locked" | "unlocked";
    type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

    // 유니언은 다양한 타입을 처리하는 방법을 제공, array 또는 string을 받는 함수가 있을 수 있다.
    function getLength(obj: string | string[]) {
        return obj.length;
    }

    function wrapInArray(obj: string | string[]) {

        // typeof를 이용해 string과 array 구분

        if (typeof obj === "string") {
            return [obj];
        } else {
            return obj;
        }
    }

    /*
    * 제네릭(Generics)
    * 배열이 일반적인 예시이며, 제네릭이 없는 배열은 어떤 것이든 포함할 수 있다.
    * 제네릭이 있는 배열은 배열 안의 값을 설명할 수 있다.
    * */

    type StringArray = Array<string>;
    type NumberArray = Array<number>;
    type objectWithNameArray = Array<{ name: string }>;
}

// 제네릭을 사용하는 고유 타입을 선언할 수 있다.
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type
}

declare const backpack: Backpack<string>;
// const object = backpack.get();

// backpack.add(23); backpack 변수가 string 이므로, add 함수에 number를 전달할 수 없다.


/*
* 구조적 타입 시스템(Structural Type System)\
* TypeScript의 핵심 원칙 중 하나는 타입 검사가 값이 있는 형태에 집중한다는 것이다.
* 덕 타이핑(duck typing), 구조적 타이핑 이라고 불림
* 구조적 타입 시스템에서 두 객체가 같은 형태를 가지면 같은 것으로 간주된다.
* */

interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

// "12, 26" 출력
const point = { x: 12, y: 26 };
printPoint(point);  // Point 타입으로 선언되지 않았지만, TypeScript가 point 변수의 형태와 Point 형태를 비교, 둘 다 같은 형태이기 때문에 통과

const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3);

const rect = { x: 33, y: 3, width: 30, height: 80};
printPoint(rect);

const color = { hex: "#187ABF" };
// printPoint(color); 에러

// 클래스 형태
// 객체 또는 클래스에 필요한 모든 속성이 존재한다면, TypeScript는 구현 세부 정보에 관계없이 일치하게 본다.
class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint);