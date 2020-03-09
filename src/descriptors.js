export const CREDENTIALS = {
  DELETE: {
    SUCCESS: 'CREDENTIALS.DELETE.SUCCESS'
  },

  POST: {
    FAILURE: 'CREDENTIALS.POST.FAILURE',
    PROPOSE: 'CREDENTIALS.POST.PROPOSE',
    SUCCESS: 'CREDENTIALS.POST.SUCCESS'
  }
}

export const USERS = {
  CREATE: {
      FAILURE: 'USERS.CREATE.FAILURE',
      SUCCESS: 'USERS.CREATE.SUCCESS'
  },

  DELETE: {
    ONE: {
      FAILURE: 'USERS.DELETE.ONE.FAILURE',
      SUCCESS: 'USERS.DELETE.ONE.SUCCESS'
    }
  },

  GET: {
    ALL: {
      FAILURE: 'USERS.GET.ALL.FAILURE',
      SUCCESS: 'USERS.GET.ALL.SUCCESS'
    },

    ONE: {
      FAILURE: 'USERS.GET.ONE.FAILURE',
      SUCCESS: 'USERS.GET.ONE.SUCCESS'
    }
  },

  UPDATE: {
    ONE: {
      FAILURE: 'USERS.UPDATE.ONE.FAILURE',
      SUCCESS: 'USERS.UPDATE.ONE.SUCCESS'
    }
  }
}
