import { ObjectProperties } from "./object-props.js";

export function csvToJSON(csv) {
  var lines = csv.split('\n');

  let jsonObject = {};
  for (var i = 1; i < lines.length; i++) {
    // Take key option and next all text.
    var currentline = lines[i].split(',', 2);
    // console.log('209', currentline);

    // const keys = currentline[0].split('.');
    ObjectProperties.setObjectProperty(
      jsonObject,
      currentline[0],
      currentline[1]
    );
  }

  //return result; //JavaScript object
  return JSON.stringify(jsonObject); //JSON
}
