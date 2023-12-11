import Github from './Github.vue';

export default function HelloWorld({ msg }: { msg: string }) {
  return (
    <>
      <h1>{msg}</h1>
      <p>
        Inspect the element to see the <code>__source</code>
      </p>
      <p>
        <Github />
      </p>
    </>
  );
}
