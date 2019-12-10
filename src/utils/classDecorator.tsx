/**
 * Usage
 *
 * const componentName = 'login-page';
 * const decorator = classDecorator(componentName);
 * const classNames = decorator('form', ['is-dark is-disabled']);
 * Output: 'login-page-form is-dark is-disabled'
 *
 */

const classDecorator = (cn: string) => (
  sc?: string | string[],
  rest?: string | string[],
): string => {
  let classes: string;

  if (!sc) {
    if (rest) {
      return cn + ' ' + (typeof rest === 'string' ? rest : rest.join(' '));
    }

    return cn;
  }

  if (typeof sc === 'string') {
    classes = `${cn}-${sc}`;
  } else {
    classes = sc.map(c => `${cn}-${sc}`).join(' ');
  }

  if (rest) {
    if (typeof rest === 'string') {
      classes += ' ' + rest;
    } else {
      classes += ' ' + rest.join(' ');
    }
  }

  return classes;
};

export default classDecorator;
