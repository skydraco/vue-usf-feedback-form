
# USF Simple Feedback Form 

Simple contact form for Vue 2 (name, email, message)


## Installation

Install vue-usf-feedback-form with npm

```bash
  npm install vue-usf-feedback-form
```
or using yarn
```bash
 yarn add vue-usf-feedback-form
```

optional: install uikit with npm

### Browser
Include the script file, e.g.:
```html
<meta name="recaptcha" content="my_recaptchs_site_key">
...
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-usf-feedback-form/dist/plugin.min.js"></script>
```
### Module
```js
import { FeedbackForm } from 'vue-usf-feedback-form';

export default {
    name: "my-component"
    components: {
        FeedbackForm
    },
    data() {
        return {
            postRequest: `${process.env.VUE_APP_SERVICES_API_URL}/post-form`,
            showErrorDetail: false,
            rowsTextarea: 4
        }
    }
}
```
./main.js
```js
import Vue from 'vue';
import { VueReCaptcha } from 'vue-usf-feedback-form';

Vue.use(VueReCaptcha, { siteKey: `${process.env.VUE_APP_CAPTCHA_SITE_KEY}` });
```
## Using
Once installed, it can be used in a template as simply as:
```vue
<feedback-form 
    :postRequest="postRequest"
    :showErrorDetail="showErrorDetail"
    :rowsTextarea="rowsTextarea"
/>
```
