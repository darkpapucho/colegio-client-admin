// type ToggleCurso = {
//   type: 'toggleCurso';
//   payload: string;
// };
// type SelectAll = {
//   type: 'selectAll';
// };
// type ClearAll = {
//   type: 'clearAll';
// };
// type CursoReducerAction = ToggleCurso | ClearAll | SelectAll;

// export default function CursosReducer(state: { [key: string]: boolean }, action: CursoReducerAction) {
//   const { type } = action;
//   switch (type) {
//     case 'toggleCurso':
//       state[action.payload] = !state[action.payload];
//       break;
//     case 'clearAll':
//       for (const curso in state) {
//         state[curso] = false;
//       }
//       break;
//     case 'selectAll':
//       for (const curso in state) {
//         state[curso] = true;
//       }
//       break;
//     default:
//       return state;
//   }
// }
