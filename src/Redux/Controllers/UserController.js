import { ApiEndPoint } from './ApiEndPoint';
import { HttpClient } from './HttpClient'

export class UserController {
  static login(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.LOGIN, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }

 static forgot(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.FORGOT, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }


  static changePassword(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.CHANGEPASSWORD, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }


  static blockUnblock(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.BLOCKUNBLOCK, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }
  
  static groupStatus(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.GROUPSTATUS, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }


   static reset(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.RESET, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }

  static resendotp(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.RESENDOTP, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }

  static verification(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.VERIFY, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
    });
  }
  
  static createUserDetails(userdata) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.CREATEUSER, userdata)
        .then(data => {
          // let data = Object.assign(response.data[0], response.data[1]);
          resolve(data);
        }).catch(e => {
          reject(e);
        })
    });
  }

  static uploadimage(params) {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.UPLOADIMAGE, params)
        .then(response => {
          resolve(response);
        }).catch((e) => {

          reject(e);
        })
    });
  }

  static validateusername(id) {
    return new Promise((resolve, reject) => {
      if (String(id).length > 0) {
        HttpClient.post(ApiEndPoint.USERNAMEVALIDATE, { userName: id })
          .then(response => {
            resolve(response);
          }).catch((e) => {
            reject(e);
          })
      }
    });
  }

  static logout() {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.LOGOUT)
        .then(response => {
          resolve(response);
        }).catch(e => {
          reject(e);
        })
    });
  }

  static userList() {
    return new Promise((resolve, reject) => {
      HttpClient.get(ApiEndPoint.USERLIST)
        .then(response => {
          resolve(response);
        }).catch(e => {
          reject(e);
        })
    });
  }

  static groupList() {
    return new Promise((resolve, reject) => {
      HttpClient.post(ApiEndPoint.GROUPLIST)
        .then(response => {
          resolve(response);
        }).catch(e => {
          reject(e);
        })
    });
  }

}
