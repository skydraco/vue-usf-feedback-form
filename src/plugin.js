import FeedbackForm from './Feedback.vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

const USFFeedbackForm = {
  install: function (Vue, options) {
    const content = document.querySelector('meta[name="recaptcha"]').getAttribute("content");
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component('usf-feedback-form', FeedbackForm);
    Vue.use(VueReCaptcha, { siteKey: content });
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(USFFeedbackForm);
}

export { FeedbackForm, VueReCaptcha };