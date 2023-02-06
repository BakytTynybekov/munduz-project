export function classNames(classes, classMod) {
  let allClasses = [
    ...classes,
    ...Object.keys(classMod).filter((key) => classMod[key] === true),
  ].join(" ");
  return allClasses;
}
