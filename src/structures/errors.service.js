export const errorMessage = {
    tooLongTitle: 'Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50',
    longDescription: 'Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200',
    todoNotFound: function(id) {
      return `Could not find an instance with todos/${id}`;
    },
    validDoneStatus:`Failed Validation: doneStatus should be BOOLEAN but was STRING`,
    extraLong: 'Error: Request body too large, max allowed is 5000 bytes',
    wrongField: "Could not find field: priority",
    notCreateToDo : "Cannot create todo with PUT due to Auto fields id",
    wrongTodoId: function(id) {
      return `No such todo entity instance with id == ${id} found`;
    },
    mandatoryField: 'title : field is mandatory',
    amendId: function(id,id2) { return `Can not amend id from ${id} to ${id2}`},
    acceptNotExist : 'Unrecognised Accept Type',
    unsupportedContentType: function(type) {
      return `Unsupported Content Type - ${type}`;
    },


    notAllowed: 'Method Not Allowed',
    serverError: 'Server Error',
    notImplemented: 'Not Implemented',
    noContent: 'No Content',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    badRequest: 'Bad Request',
  };