const accountId = context.accountId;

const initialData = Social.getr(`${accountId}/flappybos`);

const initialScore = !initialData ? 0 : Number(initialData.flappybos.score);

const srcData = `

<style>
html,
body {
  height: 100%;
}

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

loadSprite("bean", "https://kaboomjs.com/sprites/bean.png")

scene("game", () => {

	const PIPE_OPEN = 350
	const PIPE_MIN = 60
	const JUMP_FORCE = 1000
	const SPEED = 320
	const CEILING = -60

	gravity(0)

	const bean = add([
		sprite("bean"),
		pos(width() / 4, 0),
		area(),
		body(),
	])

	bean.onUpdate(() => {
		if (bean.pos.y >= height() || bean.pos.y <= CEILING) {
			go("lose", score)
		}
	})

	onKeyPress("space", () => {
		bean.jump(JUMP_FORCE)
		// play("wooosh")
	})

	onClick(() => {
		bean.jump(JUMP_FORCE)
		// play("wooosh")
	})

	onTouchStart(() => {
		bean.jump(JUMP_FORCE)
		// play("wooosh")
	})

	function spawnPipe() {
		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			"pipe",
		])

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			"pipe",
			{ passed: false, },
		])

	}

	bean.onCollide("pipe", () => {
		go("lose", score)
		// play("hit")
		addKaboom(bean.pos)
	})

	onUpdate("pipe", (p) => {
		if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	loop(1, () => {
		spawnPipe()
	})

	let score = 0

	const scoreLabel = add([
		text(score),
		origin("center"),
		pos(width() / 2, 80),
		fixed(),
	])

	/*
	const highScoreLabel = add([
		text("hi score:", {
			size: 20
		}),
		origin("center"),
		pos(width() / 10, 80),
		fixed(),
	])
	*/

	function addScore() {
		score++
		scoreLabel.text = score
		// play("score")
	}

})

scene("lose", (score) => {

	add([
		sprite("bean"),
		pos(width() / 2, height() / 2 - 108),
		scale(3),
		origin("center"),
	])

	add([
		text(score),
		pos(width() / 2, height() / 2 + 108),
		scale(3),
		origin("center"),
	])

	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))
	onTouchStart(() => go("game"))

	window.top.postMessage({ score: score }, "*")
})

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
            flappybos: {
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
