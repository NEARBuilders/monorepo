const networkData = Social.get(`*/graph/follow/*`, "final");

if (networkData === null) {
  return "Loading...";
}

const testData = {
  "hack.near": {
    graph: {
      follow: {
        "devs.near": "",
      },
    },
  },
  "devs.near": {
    graph: {
      follow: {
        "every.near": "",
      },
    },
  },
  "root.near": {
    graph: {
      follow: {
        "mob.near": "",
      },
    },
  },
  "every.near": {
    graph: {
      follow: {
        "hack.near": "",
      },
    },
  },
};

const scriptSrc = `

<style>
* { margin: 0; padding: 0;}

body, html { height: 100%; }

#c {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>

<script type="module">
    let data = ${JSON.stringify(networkData)};
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let nodes = [];
    let edges = [];
    for (let account in data) {
let radius = 5;  // The radius of the nodes
let padding = radius + 1;  // Additional padding to account for stroke width
nodes.push({
    id: account, 
    x: padding + Math.random()*(canvas.width - 2*padding), 
    y: padding + Math.random()*(canvas.height - 2*padding)
});
      for (let follower in data[account]["graph"]["follow"]) {
        edges.push({source: account, target: follower});
      }
    }

    function drawNode(node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }

    function drawEdge(edge) {
        let sourceNode = nodes.find(node => node.id === edge.source);
        let targetNode = nodes.find(node => node.id === edge.target);

        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(drawNode);
        edges.forEach(drawEdge);
    };

    animate();
            
</script>
`;

console.log(JSON.stringify(networkData));
console.log(JSON.stringify(testData));

return (
  <div>
    <iframe
      srcDoc={scriptSrc}
      width="888"
      height="888"
      style={{ width: "100%" }}
    />
  </div>
);
