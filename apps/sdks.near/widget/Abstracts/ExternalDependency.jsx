return (props) => {
  const code = `
        <script>
            const ping = () => {
                window.top.postMessage("ping", "*");
            }
        </script>
        <script type="text/javascript" src="https://unpkg.com/${props.adapter.package}"></script>
        <script type="text/javascript">

            if (window["${props.adapter.name}"]) {
                ping();
            }
        
            const getPackageMethod = (instruction, package) => {
                return typeof package != "function" ? instruction.split(".").reduce((path, nextPath) => (path || {})[nextPath], package) : package;
            };
        
            window.addEventListener("message", (e) => {
              if (e.data.instruction) {
                 let value = Array.isArray(e.data.value) ? e.data.value : [e.data.value];
                 let result = getPackageMethod(e.data.instruction, window["${props.adapter.name}"])(...value);
                 let parseResult = (result) => {
                    if (e.data.returnType == "object" || e.data.returnType == "array") {
                        return JSON.stringify(result);
                    }
        
                    if (e.data.returnType == "string") {
                        return result.toString();
                    }

                    if (e.data.returnType == "number") {
                        return result;
                    }

                    if (e.data.returnType == "canvas") {
                        return result.toDataURL();
                    }
                 }
        
                 window.top.postMessage({
                    index: e.data.index,
                    instruction: e.data.instruction,
                    returnType: e.data.returnType,
                    result: parseResult(result)
                 }, "*");
              }
            })
        </script>
   `;

  return (
    <iframe
      srcDoc={code}
      style={{ display: "none" }}
      message={props.adapter.getRequest()}
      onMessage={(data) =>
        data == "ping"
          ? props.adapter.setAsReady()
          : props.adapter.setResponse(data)
      }
    />
  );
};
