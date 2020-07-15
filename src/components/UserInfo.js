export default class UserInfo {
  constructor(userData) {
    this._nameSelector = userData.nameSelector;
    this._jobSelector = userData.jobSelector;
    this._avatarSelector = userData.avatarSelector;
  }

  getUserInfo() {
    this._name = document.querySelector(this._nameSelector).textContent;
    this._job = document.querySelector(this._jobSelector).textContent;

    this._userObj = {
      name: this._name,
      about: this._job
    };

    return this._userObj;
  }

  setAvatar(avatarUrl) {
    this._avatar = document.querySelector(this._avatarSelector);
    this._avatar.src = avatarUrl;
  }

  setUserInfo(newUserObj) {
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);

    this._name.textContent = newUserObj.name;
    this._job.textContent = newUserObj.about;
  }
}