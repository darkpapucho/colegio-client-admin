// import { Grado, Seccion } from '../../../../types/enums';

// export type ProfesorData = {
//   nombres: string;
//   apellidos: string;
//   dni: number;
//   telefono?: number;
//   salones: SalonProfesor[];
// };

// export type SalonProfesor = { tutor: boolean; label: string; value: { grado: Grado; seccion: Seccion }; order: number; cursos: { label: string; key: string }[] };
// type AddCursoAction = {
//   type: 'updateSelectedSalones';
//   payload: SalonProfesor[];
// };
// type ToggleTutoria = {
//   type: 'toggleTotoria';
//   payload: string;
// };
// type RemoveCursoAction = {
//   type: 'updateCursosSalon';
//   payload: { salonLabel: string; curso: { label: string; key: string } };
// };

// export type SelectedSalonesAction = AddCursoAction | RemoveCursoAction | ToggleTutoria;
// export default function SelectedSalonesReducer(state: { selectedSalones: SalonProfesor[] }, action: SelectedSalonesAction) {
//   switch (action.type) {
//     case 'toggleTotoria': {
//       const index = state.selectedSalones.findIndex((salon) => salon.label === action.payload);
//       state.selectedSalones[index].tutor = !state.selectedSalones[index].tutor;
//       break;
//     }
//     case 'updateSelectedSalones':
//       state.selectedSalones = [...action.payload];
//       break;
//     case 'updateCursosSalon': {
//       state.selectedSalones = state.selectedSalones.map((salon) => {
//         if (salon.label === action.payload.salonLabel) {
//           const cursoIndex = salon.cursos.findIndex((curso) => curso.key === action.payload.curso.key);
//           if (cursoIndex === -1) {
//             salon.cursos.push(action.payload.curso);
//           } else {
//             salon.cursos.splice(cursoIndex, 1);
//           }
//         }
//         return salon;
//       });
//       break;
//     }
//     default:
//       return state;
//   }
// }
