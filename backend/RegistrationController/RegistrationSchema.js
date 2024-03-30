const mongoose = require('mongoose');
const JsonData =require('../../frontend/src/DynamicForm/formfileds.json');
function generateSchema(jsonSchema) {
    const schemaObj = {};
  
    jsonSchema.forEach(field => {
      const { name, inputType } = field;
      let type;
      if (inputType === 'text') {
        type = String;
      } else if (inputType === 'dropdown') {
        type = String; 
      } else if (inputType === 'radio') {
        type = String; 
      }
      schemaObj[name] = {
        type,
        required: field.required
      };
      if (field.options && (inputType === 'dropdown' || inputType === 'radio')) {
        schemaObj[name].enum = field.options;
      }
    });  
    return new mongoose.Schema(schemaObj);
  }
  
  const generatedSchema = generateSchema(JsonData);

  const DynamicModel = mongoose.model('DynamicModel', generatedSchema);

  module.exports = DynamicModel;