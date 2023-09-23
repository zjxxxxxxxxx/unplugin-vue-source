import { defineComponent } from 'vue';

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
          <a
            target="_black"
            href="https://github.com/zjxxxxxxxxx/unplugin-vue-source"
          >
            Github
          </a>
        </p>
      </div>
    );
  },
});
