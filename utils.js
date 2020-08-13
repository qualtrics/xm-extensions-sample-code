// https://eslint.org/docs/rules/no-prototype-builtins
export function hasField(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
