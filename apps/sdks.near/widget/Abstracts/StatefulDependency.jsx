return (Store, status, dependencyName) => {
  let Repository = {
    identifier: "Libraries",
    init: () => {
      if (typeof status === "undefined") {
        Store.init({ [Repository.identifier]: {} });
      } else if (!status[Repository.identifier]) {
        Store.update({ [Repository.identifier]: {} });
      }

      return Repository;
    },
    getRepository: () => {
      return status[Repository.identifier] || {};
    },
    getDependency: () => {
      return Repository.getRepository()[dependencyName] || {};
    },
    get: (key) => {
      return Repository.getDependency()[key] || null;
    },
    set: (key, value) => {
      if (Repository.getDependency()) {
        let newRepository = Repository.getRepository();
        newRepository[dependencyName][key] = value;

        Store.update({
          [Repository.identifier]: newRepository,
        });
      }
    },
    initDependency: (initState) => {
      if (!Repository.get("initialized")) {
          let newRepository = Repository.getRepository();
          newRepository[dependencyName] = {
            ...initState,
            initialized: true
          };
    
          Store.update({
            [Repository.identifier]: newRepository,
          });
      }
    },
  };

  return Repository.init();
};
