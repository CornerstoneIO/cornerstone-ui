import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: null,
  store: Ember.inject.service(),
  login(userName, password) {
    return new Promise((resolve, reject)=>{
      Ember.$.ajax({
        method: 'POST',
        url: '/token',
        data: {
          email: userName,
          password: password
        }
      }).then((data)=>{
        var token = data['authentication_token'];
        var account_id = data['account_id'];
        console.log('Token: ' + token + ' account id: ' + account_id);
        Cookies.set('accountId', account_id);
        Cookies.set('authenticationToken', token);
        this.initializeFromCookie();
        resolve();
      }, ()=>{
        reject('Username and password did not match');
      });
    });
  },
  logout(){
    this.set("currentUser", null);
    Cookies.remove('accountId');
    Cookies.remove('authenticationToken');
  },
  initializeFromCookie: function(){
    var accountId = Cookies.get('accountId');
    if(!!accountId){
      var account = this.get('store').find('account', accountId)
      this.set('currentUser', account)
    }
  }.on('init')
});
