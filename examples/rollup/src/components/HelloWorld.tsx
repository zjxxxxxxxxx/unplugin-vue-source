import { defineComponent } from 'vue';
import Github from './Github.vue';

export default defineComponent({
  props: { msg: String },
  render() {
    return (
      <div>
        <h1>{this.msg}</h1>
        <p>
          Inspect the element to see the <code>__source</code>
        </p>
        <p>
          <Github />
        </p>
      </div>
    );
  },
});
