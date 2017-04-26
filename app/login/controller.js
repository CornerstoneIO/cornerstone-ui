import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    login() {
      let {userName, password} = this.getProperties('userName', 'password');
      this.get('session').login(userName, password).then(()=> {
        this.transitionToRoute('authenticated');
      }).catch((reason)=>{
        // this.set('showErrors', true);
        // this.get('flashMessages').danger(reason);
        console.log(reason);
      })
    }
  },

  transitionToPreviousRoute(){
    var previousTransition = this.get('previousTransition');
    if (previousTransition) {
      this.set('previousTransition', null);
      previousTransition.retry();
    } else {
      this.transitionToRoute('index');
    }
  }
});
