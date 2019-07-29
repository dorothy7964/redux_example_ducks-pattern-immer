# immer

 마치 불변성에 대해서 신경쓰지 않는 것 처럼 데이터를 업데이트 해주면,   
 라이브러리가 알아서 불변성 유지를 해주면서 업데이트를 해줍니다.

```javascript
import produce from 'immer';
```

### counter.js 모듈에 immer 적용

**src/store/modules/counter.js**

```javascript
import produce from 'immer'; // **** immer 불러오기

// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생섬함수 정의
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// 초기상태 정의
const initialState = {
  color: 'red',
  number: 0,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return produce(state, draft => {
        draft.color = action.color;
      });
    case INCREMENT:
      return produce(state, draft => {
        draft.number++;
      });
    case DECREMENT:
      return produce(state, draft => {
        draft.number--;
      });
    default:
      return state;
  }
}
```

### waiting.js 모듈에 Immer 적용

**src/modules/waiting.js**

```javascript
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer'; // **** Immer 불러오기

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

let id = 3;
// createAction 으로 액션 생성함수 정의
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// **** 초기 상태 정의
const initialState = {
  input: '',
  list: [
    {
      id: 0,
      name: '홍길동',
      entered: true,
    },
    {
      id: 1,
      name: '콩쥐',
      entered: false,
    },
    {
      id: 2,
      name: '팥쥐',
      entered: false,
    },
  ],
};

// handleActions 로 리듀서 함수 작성
// **** 내부 업데이트 로직 모두 업데이트
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.input = action.payload;
      }),
    [CREATE]: (state, action) =>
      produce(state, draft => {
        draft.list.push({
          id: action.payload.id,
          name: action.payload.text,
          entered: false,
        });
      }),
    [ENTER]: (state, action) =>
      produce(state, draft => {
        const item = draft.list.find(item => item.id === action.payload);
        item.entered = !item.entered;
      }),
    [LEAVE]: (state, action) =>
      produce(state, draft => {
        draft.list.splice(
          draft.list.findIndex(item => item.id === action.payload),
          1
        );
      }),
  },
  initialState
);
```
