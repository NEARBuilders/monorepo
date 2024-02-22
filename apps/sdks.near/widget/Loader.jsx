let TYPES = {};
const TYPE_LIBRARY = "@";
const TYPE_IMAGE = "img:";
const TYPE_JSON = "json:";
const TYPE_URL = "url:";
TYPES[TYPE_LIBRARY] = "libs";
TYPES[TYPE_IMAGE] = "images";
TYPES[TYPE_JSON] = "data";
TYPES[TYPE_URL] = "links";

const getWidgetPath = (account, dependency, version) => `${account}/widget/${dependency}${version ? `@${version}` : ""}`;

let loaders = {};
loaders[TYPES[TYPE_LIBRARY]] = {
  string: (account, dependency, version, Store) => {
    if (Store) {
      let name = dependency.split(".").pop();

      Store.update({
        [name]: VM.require(getWidgetPath(account, dependency, version))
      });

      return Store.get(name) || {};
    } else {
      let result = {};
      result[dependency.split(".").pop()] = VM.require(
        getWidgetPath(account, dependency, version)
      );
      return result;
    }
  },
  object: (account, dependencies, version) => {
    let result = {};

    if (Array.isArray(dependencies)) {
      dependencies.map(
        (dependency) =>
          (result[dependency.split(".").pop()] = VM.require(
            getWidgetPath(account, dependency, version)
          ))
      );
    } else {
      Object.keys(dependencies).map((containerName) =>
        dependencies[containerName].map(
          (dependency) =>
            (result[dependency.split(".").pop()] = VM.require(
              getWidgetPath(account, dependency, version)
            ))
        )
      );
    }

    return result;
  },
  void: () => {},
};

loaders[TYPES[TYPE_IMAGE]] = {
  string: (account, value) => value,
  void: () => {},
};

loaders[TYPES[TYPE_URL]] = loaders[TYPES[TYPE_IMAGE]];
loaders[TYPES[TYPE_JSON]] = {
  string: (account, text) => JSON.parse(text),
  object: (account, data) => data,
  void: () => {},
};

const getType = (type) => (type in TYPES ? TYPES[type] : null);
const getScope = (namespace) =>
  namespace[0] in TYPES
    ? namespace[0]
    : namespace.substring(0, namespace.indexOf(":") + 1) in TYPES
    ? namespace.substring(0, namespace.indexOf(":") + 1)
    : null;
const getAccount = (scope, namespace) =>
  `${namespace.substring(scope.length, namespace.indexOf("/"))}.near`;
const getPath = (namespace) =>
  namespace.substring(namespace.indexOf("/") + 1, namespace.indexOf("#") != -1 ? namespace.indexOf("#") : namespace.length);
const getVersion = (namespace) => {
  return namespace.indexOf("#") != -1 ? namespace.substring(namespace.indexOf("#") + 1, namespace.length) : "latest";
}

const parseRequest = (namespace) => [
  getAccount(getScope(namespace), namespace),
  getType(getScope(namespace)),
  getPath(namespace),
  getVersion(namespace)
];
const getManifest = (account) => VM.require(`${account}/widget/Manifest`);
const getResource = (manifest, resourceType) =>
  resourceType in manifest ? manifest[resourceType] : {};
const getDependencies = (resource, path) =>
  path.split("/").reduce((path, nextPath) => (path || {})[nextPath], resource);
const loadDependencies = (account, loaderName, dependencies, Store) =>
  loaders[loaderName || TYPES[TYPE_LIBRARY]][
    typeof dependencies !== "undefined" ? typeof dependencies : "void"
  ](account, dependencies, Store);

const mapVersion = (version, path, manifest) => {
  let dependency = path.split("/").shift();
  let releases = manifest["releases"] || {};

  return version && dependency in releases && version in releases[dependency] ? releases[dependency][version] : null;
}

const load = (account, resourceType, path, version, Store) => {
  const manifest = getManifest(account) || {};

  return loadDependencies(
    account,
    resourceType,
    getDependencies(getResource(manifest, resourceType), path),
    mapVersion(version, path, manifest),
    Store
  );
}

return (namespace, Store) => load(...parseRequest(namespace), Store);