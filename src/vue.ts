import { TRACE_ID } from './core/constants';
import { isDev } from './core/isDev';
export default {
  install(app: any) {
    if (isDev()) {
      app.mixin({
        props: {
          [TRACE_ID]: String,
        },
      });
    }
  },
};
