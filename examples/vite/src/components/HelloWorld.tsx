export default function HelloWorld({ msg }: { msg: string }) {
  return (
    <>
      <h1>{msg}</h1>
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
    </>
  );
}
