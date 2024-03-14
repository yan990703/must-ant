<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div class="sign-in">

    <a-row :gutter="[24,24]" align="middle" justify="space-around" type="flex">

      <!-- Sign In Form Column -->
      <a-col :lg="{span: 12, offset: 0}" :md="12" :span="24" :xl="{span: 6, offset: 2}" class="col-form">
        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted">Enter your email and password to sign in</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            :hideRequiredMark="true"
            class="login-form"
            @submit="handleSubmit"
        >
          <a-form-item :colon="false" class="mb-10" label="Email">
            <a-input
                v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]" placeholder="Email"/>
          </a-form-item>
          <a-form-item :colon="false" class="mb-5" label="Password">
            <a-input
                v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]" placeholder="Password" type="password"/>
          </a-form-item>
          <a-form-item class="mb-10">
            <a-switch v-model="rememberMe"/>
            Remember Me
          </a-form-item>
          <a-form-item>
            <a-button block class="login-form-button" html-type="submit" type="primary">
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Don't have an account?
          <router-link class="font-bold text-dark" to="/sign-in">Sign Up</router-link>
        </p>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :lg="12" :md="12" :span="24" :xl="12" class="col-img">
        <img alt="" src="images/img-signin.jpg">
      </a-col>
      <!-- Sign In Image Column -->

    </a-row>

  </div>
</template>

<script>

export default {
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      rememberMe: true,
    }
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
}

</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>