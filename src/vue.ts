import { TRACE_ID } from './core/constants';
export default {
  install(app: any) {
    if (process.env.NODE_ENV === 'development') {
      app.mixin({
        props: {
          [TRACE_ID]: String,
        },
      });
    }
  },
};
