const accountId = context.accountId;

const initialData = Social.getr(`${accountId}/cityscape`);

const initialScore = !initialData ? 0 : Number(initialData.cityscape.score);

const srcData = `

<style>
html,

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

</style>

<script src="https://cdn.jsdelivr.net/npm/kaboom@2000.2.10/dist/kaboom.js"></script>
<script>

window.addEventListener("load", (event) => {
  init()
});
</script>
<script>
const init = () => {

kaboom()

loadSprite("character", "https://kaboomjs.com/sprites/bean.png")
loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png")

const player = add([
	sprite("character"),
	pos(120, 80),
])

player.onUpdate(() => {
	player.angle += 120 * dt()
})

for (let i = 0; i < 3; i++) {

	const x = rand(0, width())
	const y = rand(0, height())

	add([
		sprite("ghosty"),
		pos(x, y),
	])

}

go("game")
}
</script>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        State.update({ ...data });

        const newScore = Number(data.score);

        if (newScore > initialScore) {
          Social.set({
            cityscape: {
              ...data,
            },
          });
        }
      }}
      style={{
        height: "80vh",
        width: "100%",
      }}
    />
  </>
);
