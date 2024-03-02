const networkData = Social.get(`*/graph/trust/*`, "final");

if (networkData === null) {
  return "Loading...";
}

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
      nodes.push({id: account, x: Math.random()*canvas.width, y: Math.random()*canvas.height});
      for (let trusted in data[account]["graph"]["trust"]) {
        edges.push({source: account, target: trusted});
      }
    }

    function drawNode(node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 1;
    }

    function drawEdge(edge) {
        let sourceNode = nodes.find(node => node.id === edge.source);
        let targetNode = nodes.find(node => node.id === edge.target);
        if(sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, 10000);
        nodes.forEach(drawNode);
        edges.forEach(drawEdge);
        requestAnimationFrame(animate);
    };

    animate();
</script>
`;

return (
  <div>
    <iframe
      srcDoc={scriptSrc}
      width="888"
      height="888"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);
