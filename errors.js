// [
//     ValidatorError: please enter a name
//         at validate (I:\programing\login-system\node_modules\mongoose\lib\schematype.js:1222:13)
//         at I:\programing\login-system\node_modules\mongoose\lib\schematype.js:1205:7
//         at Array.forEach (<anonymous>)
//         at SchemaString.SchemaType.doValidate (I:\programing\login-system\node_modules\mongoose\lib\schematype.js:1150:14)
//         at I:\programing\login-system\node_modules\mongoose\lib\document.js:2435:18
//         at processTicksAndRejections (internal/process/task_queues.js:79:11) {
//       properties: {
//         validator: [Function],
//         message: 'please enter a name',
//         type: 'required',
//         path: 'name',
//         value: undefined
//       },
//       kind: 'required',
//       path: 'name',
//       value: undefined,
//       reason: undefined,
//       [Symbol(mongoose:validatorError)]: true
//     },
//     ValidatorError: password should be 6 charecter long
//         at validate (I:\programing\login-system\node_modules\mongoose\lib\schematype.js:1222:13)
//         at I:\programing\login-system\node_modules\mongoose\lib\schematype.js:1205:7
//         at Array.forEach (<anonymous>)
//         at SchemaString.SchemaType.doValidate (I:\programing\login-system\node_modules\mongoose\lib\schematype.js:1150:14)
//         at I:\programing\login-system\node_modules\mongoose\lib\document.js:2435:18
//         at processTicksAndRejections (internal/process/task_queues.js:79:11) {
//       properties: {
//         validator: [Function],
//         message: 'password should be 6 charecter long',
//         type: 'minlength',
//         minlength: 6,
//         path: 'password',
//         value: 'kjd'
//       },
//       kind: 'minlength',
//       path: 'password',
//       value: 'kjd',
//       reason: undefined,
//       [Symbol(mongoose:validatorError)]: true
//     }
//   ]
  