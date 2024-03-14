<!-- 
	This is the sign up page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div>

    <!-- Sign Up Image And Headings -->
    <div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">
      <div class="content">
        <h1 class="mb-5">Sign Up</h1>
        <p class="text-lg">Use these awesome forms to login or create new account in your project for free.</p>
      </div>
    </div>
    <!-- / Sign Up Image And Headings -->

    <!-- Sign Up Form -->
    <a-card :bodyStyle="{paddingTop: 0}" :bordered="false" class="card-signup header-solid h-full">
      <template #title>
        <h5 class="font-semibold text-center">Register With</h5>
      </template>
      <div class="sign-up-gateways">
        <a-button>
          <img alt="" src="images/logos/logos-facebook.svg">
        </a-button>
        <a-button>
          <img alt="" src="images/logos/logo-apple.svg">
        </a-button>
        <a-button>
          <img alt="" src="images/logos/Google__G__Logo.svg.png">
        </a-button>
      </div>
      <p class="text-center my-25 font-semibold text-muted">Or</p>
      <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
      >
        <a-form-item class="mb-10">
          <a-input
              v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input your name!' }] },
						]"
              placeholder="Name"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-10">
          <a-input
              v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]"
              placeholder="Email"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-5">
          <a-input
              v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
              placeholder="Password"
              type="password"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-10">
          <a-checkbox
              v-decorator="[
						'remember',
						{
							valuePropName: 'checked',
							initialValue: true,
						},
						]"
          >
            I agree the <a class="font-bold text-dark" href="#">Terms and Conditions</a>
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button block class="login-form-button" html-type="submit" type="primary">
            SIGN UP
          </a-button>
        </a-form-item>
      </a-form>
      <p class="font-semibold text-muted text-center">Already have an account?
        <router-link class="font-bold text-dark" to="/sign-in">Sign In</router-link>
      </p>
    </a-card>
    <!-- / Sign Up Form -->

  </div>
</template>

<script>

export default ({
  data() {
    return {}
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
})

</script>

<style lang="scss">
</style>