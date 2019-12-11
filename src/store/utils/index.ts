// action helper

interface Action<T> {
  type: T;
}

interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

// const functionName = <generics>(param: type): returnType => {}
export const createAction = <T, P>(type: T, payload?: P): Action<T> | ActionWithPayload<T, P> => {
  if (payload) {
    return { type, payload };
  } else {
    return { type };
  }
};
