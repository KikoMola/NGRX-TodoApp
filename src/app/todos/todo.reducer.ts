import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, editar, toggle, borrar, toggleAll } from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del Capitan America'),
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) => {
    return state.filter((todo) => todo.id !== id);
  }),
  on(toggleAll, (state, { completado }) =>
    state.map((todo) => {
      return {
        ...todo,
        completado,
      };
    })
  )
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
