<template>
    <div class="feedback-form">
        <div class="feedback-form__header">
            Обратная связь
        </div>
        <div class="feedback-form__fields">
            <div class="field" :class="{ error : inputs.name }">
                <input
                    id="name"
                    class="uk-input"
                    type="text"
                    name="name"
                    v-model="model.name"
                    @focus="checkInputValue"
                    @blur="checkInputValue"
                />
                <label for="name" class="placeholder" ref="name">Укажите имя</label>
                <div class="field__error" v-if="inputs.name && showErrorDetail">
                    {{ inputs.name }}
                </div>
            </div>
            <div class="field" :class="{ error : inputs.email }">
                <input
                    id="email"
                    class="uk-input"
                    type="email"
                    name="email"
                    v-model="model.email"
                    @focus="checkInputValue"
                    @blur="checkInputValue"
                />
                <label for="email" class="placeholder" ref="email">Укажите почту</label>
                <div class="field__error" v-if="inputs.email && showErrorDetail">
                    {{ inputs.email }}
                </div>
            </div>
        </div>
        <div class="feedback-form__fields">
            <div class="field" :class="{ error : inputs.message }">
                <textarea
                    id="message"
                    class="uk-textarea"
                    type="text"
                    :rows="rowsTextarea"
                    name="message"
                    v-model="model.message"
                    @focus="checkInputValue"
                    @blur="checkInputValue"
                ></textarea>
                <label for="message" class="placeholder" ref="message">Ваше сообщение</label>
                <div class="field__error" v-if="inputs.message && showErrorDetail">
                    {{ inputs.message }}
                </div>
            </div>
        </div>

        <div class="feedback-confirm">
            <button
                class="button button-primary"
                @click="recaptcha"
                :disabled="model.name == null || model.email == null || model.message == null || !enabled"
            >
                <span uk-spinner v-if="!enabled"></span>
                Написать нам
            </button>
            

            <div class="feedback-message message-success" v-if="success">
                <strong>
                    <span>Готово!</span>
                    Сообщение успешно отправлено.
                </strong>
            </div>

            <div class="feedback-message message-error" v-if="!success && errors">
                <strong>
                    <span>Произошла ошибка!</span>
                    {{ errors.message }}
                </strong>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/assets/sass/style.sass';

export default {
    props: {
        rowsTextarea: {
            type: Number,
            default: 4
        },
        showErrorDetail: {
            type: Boolean,
            default: false
        },
        postRequest: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            errors: null,
            success: null,
            model: {
                name: null,
                email: null,
                message: null,
            },
            enabled: true,
            duration: 200,
        }
    },
    computed: {
        inputs() {
            if (this.errors && this.errors.inputs) {
                return this.errors.inputs;
            }
            return {};
        },
    },
    methods: {
        checkInputValue(event) {
            const name = event.target.name;

            if (name && !event.target.value) {
                this.$refs[name].classList.toggle('placeholder_top')
            }
        },
        async postFeedbackForm(data) {
            this.errors = null;
            this.success = false;
            this.enabled = false;
            
            let duration = this.duration;
            let status = false;

            await axios
                .post(this.postRequest, data)
                .then((response) => {
                
                    status = response.data.success;
                    
                    if (response.data.success) {
                        duration = 0;

                        for (let key in this.model) {
                            this.model[key] = null;
                        }

                        const pht = document.querySelectorAll('.placeholder_top');
                        if (pht) {
                            pht.forEach(p => p.classList.remove('placeholder_top'));
                        }
                       
                    } else {
                        this.errors = response.data;
                    }
                })
                .catch(() => {});

            setTimeout(() => {
                this.enabled = true;
                this.success = status;
            }, duration);
        },
        async recaptcha() {
            let enabled = this.enabled;
            this.errors = null;

            for (let key in this.model) {
                if (this.model[key] == null) {       
                    let inputs = this.errors?.inputs ?? [];
                    inputs[key] = 'Это поле не может быть пустым.';

                    this.errors = {
                        message: 'Заполните все поля.',
                        inputs
                    };    
                    enabled = false;
                }
            }

            if (true === enabled) {
                await this.$recaptchaLoaded();
                this.model['token'] = await this.$recaptcha('login');
                this.postFeedbackForm(this.model);
            }
        },
    }
}
</script>