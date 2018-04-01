import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import ForgotPassword from '@/components/ForgotPassword';
import Profile from '@/components/Profile';

// Import guards
import setLocalUser from './guards/set-local-user';
import authenticatedOnly from './guards/authenticated-only';
import anonymousOnly from './guards/anonymous-only';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },

    {
      path: '/sign-in',
      name: 'Sign In',
      component: SignIn,
      beforeEnter: anonymousOnly,
    },

    {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignUp,
      beforeEnter: anonymousOnly,
    },

    {
      path: '/forgot-password',
      name: 'Forgot Password',
      component: ForgotPassword,
      beforeEnter: anonymousOnly,
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: authenticatedOnly,
    },
  ],
});

router.beforeEach(setLocalUser);

export default router;
