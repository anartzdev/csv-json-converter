// JSON file (./json/index)
// To use in convert JSON to CSV

// Extract values of path in different levels
function extractKeysInsideObjectProperties(object, path = '') {
  if (!object || typeof object !== 'object') return path;
  return Object.keys(object).map((key) =>
    extractKeysInsideObjectProperties(
      object[key],
      path ? [path, key].join('.') : key
    )
  );
}

// Extract all values complete paths to take info
export const objectPaths = (object) => {
  return extractKeysInsideObjectProperties(object).toString().split(',');
};


/**
 * 
 * @param json All JSON Info
 * @returns Array with objects that take key and value properties
 * <{
    key: string;
    value: string;
  }>
 */
export const extractAllJsonValues = (json) => {
  console.log(json);
  console.log(objectPaths(json));
  return objectPaths(json).map((item) => {
    return {
      key: item,
      value: ObjectProperties.getObjectProperty(json, item),
    };
  });
};
